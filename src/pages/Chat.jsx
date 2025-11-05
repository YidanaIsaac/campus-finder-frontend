import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { chatAPI } from '../utils/api';
import MainLayout from '../layouts/MainLayout';

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  // Initialize Socket.IO connection
  useEffect(() => {
    const token = localStorage.getItem('token');
    const socketInstance = io(import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5000', {
      auth: { token }
    });

    socketInstance.on('connect', () => {
      console.log('✅ Connected to Socket.IO');
    });

    socketInstance.on('disconnect', () => {
      console.log('❌ Disconnected from Socket.IO');
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Load user's chats
  useEffect(() => {
    loadChats();
  }, []);

  // Listen for new messages
  useEffect(() => {
    if (!socket) return;

    socket.on('new-message', (message) => {
      // Update messages if this message is for the current chat
      if (selectedChat && message.chatId === selectedChat.chatId) {
        setMessages(prev => [...prev, message]);
        scrollToBottom();
        
        // Mark as read
        chatAPI.markAsRead(selectedChat.chatId);
      }

      // Update chat list to show new message
      loadChats();
    });

    return () => {
      socket.off('new-message');
    };
  }, [socket, selectedChat]);

  // Join chat room when chat is selected
  useEffect(() => {
    if (socket && selectedChat) {
      socket.emit('join-chat', selectedChat.chatId);
      loadMessages(selectedChat.chatId);
      
      return () => {
        socket.emit('leave-chat', selectedChat.chatId);
      };
    }
  }, [socket, selectedChat]);

  const loadChats = async () => {
    try {
      setLoading(true);
      const data = await chatAPI.getUserChats();
      setChats(data.chats || []);
    } catch (error) {
      console.error('Failed to load chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (chatId) => {
    try {
      const data = await chatAPI.getChatMessages(chatId);
      setMessages(data.messages || []);
      scrollToBottom();
      
      // Mark messages as read
      await chatAPI.markAsRead(chatId);
      loadChats(); // Refresh chat list to update unread count
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedChat) return;

    try {
      setSending(true);
      const otherUser = selectedChat.participants.find(p => p._id !== currentUser._id);
      
      await chatAPI.sendMessage({
        chatId: selectedChat.chatId,
        content: newMessage,
        receiverId: otherUser._id,
        itemId: selectedChat.itemId?._id
      });

      setNewMessage('');
      scrollToBottom();
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const getOtherUser = (chat) => {
    return chat.participants.find(p => p._id !== currentUser._id) || {};
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Messages</h1>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
            <div className="flex h-full">
              {/* Chat List */}
              <div className="w-full md:w-1/3 border-r border-gray-200 overflow-y-auto">
                {loading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading chats...</p>
                  </div>
                ) : chats.length === 0 ? (
                  <div className="p-8 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No messages yet</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Start a conversation about a lost item
                    </p>
                  </div>
                ) : (
                  chats.map((chat) => {
                    const otherUser = getOtherUser(chat);
                    const unreadCount = chat.unreadCount?.[currentUser._id] || 0;
                    
                    return (
                      <div
                        key={chat._id}
                        onClick={() => setSelectedChat(chat)}
                        className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedChat?.chatId === chat.chatId ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                              {otherUser.avatar ? (
                                <img
                                  src={otherUser.avatar}
                                  alt={otherUser.name}
                                  className="h-12 w-12 rounded-full object-cover"
                                />
                              ) : (
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                  <span className="text-white font-semibold text-lg">
                                    {otherUser.name?.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Chat Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold text-gray-900 truncate">
                                  {otherUser.name}
                                </p>
                                {chat.lastMessage && (
                                  <span className="text-xs text-gray-500 ml-2">
                                    {formatTime(chat.lastMessage.timestamp)}
                                  </span>
                                )}
                              </div>
                              
                              {chat.itemId && (
                                <p className="text-xs text-blue-600 mt-1">
                                  📦 {chat.itemId.title}
                                </p>
                              )}
                              
                              {chat.lastMessage && (
                                <p className="text-sm text-gray-600 truncate mt-1">
                                  {chat.lastMessage.sender === currentUser._id ? 'You: ' : ''}
                                  {chat.lastMessage.content}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Unread Badge */}
                          {unreadCount > 0 && (
                            <div className="flex-shrink-0 ml-2">
                              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-600 text-white text-xs font-medium">
                                {unreadCount}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Messages Area */}
              <div className="flex-1 flex flex-col">
                {selectedChat ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200 bg-white">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {getOtherUser(selectedChat).avatar ? (
                            <img
                              src={getOtherUser(selectedChat).avatar}
                              alt={getOtherUser(selectedChat).name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                              <span className="text-white font-semibold">
                                {getOtherUser(selectedChat).name?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {getOtherUser(selectedChat).name}
                          </h3>
                          {selectedChat.itemId && (
                            <p className="text-sm text-gray-600">
                              About: {selectedChat.itemId.title}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                      {messages.map((message) => {
                        const isCurrentUser = message.sender._id === currentUser._id;
                        
                        return (
                          <div
                            key={message._id}
                            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-xs lg:max-w-md ${isCurrentUser ? 'order-2' : 'order-1'}`}>
                              <div
                                className={`px-4 py-2 rounded-2xl ${
                                  isCurrentUser
                                    ? 'bg-blue-600 text-white rounded-br-none'
                                    : 'bg-white text-gray-900 rounded-bl-none shadow-sm'
                                }`}
                              >
                                <p className="text-sm break-words">{message.content}</p>
                              </div>
                              <div className={`flex items-center mt-1 space-x-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                                <span className="text-xs text-gray-500">
                                  {formatTime(message.createdAt)}
                                </span>
                                {isCurrentUser && message.read && (
                                  <span className="text-xs text-blue-600">✓✓</span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t border-gray-200 bg-white">
                      <form onSubmit={sendMessage} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          disabled={sending}
                        />
                        <button
                          type="submit"
                          disabled={sending || !newMessage.trim()}
                          className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                          {sending ? 'Sending...' : 'Send'}
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                      <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <h3 className="mt-4 text-xl font-medium text-gray-900">Select a chat</h3>
                      <p className="mt-2 text-gray-500">
                        Choose a conversation from the list to start messaging
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Chat;
