import { useEffect, useRef, useState } from 'react';
import {BoardCard} from '../components/CanvasBoard/types/Card';

interface CollaborationData {
  boardCards: BoardCard[];
  brainstormNotes: string;
  onlineUsers: string[];
  lastUpdated: number;
}

// Simulate a simple in-memory storage for demo purposes
// In production, this would be replaced with a real backend
const sessionStorage = new Map<string, CollaborationData>();

export const useCollaboration = (sessionId: string, userName: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const lastUpdateRef = useRef<number>(0);
  const updateCallbacksRef = useRef<{
    onBoardUpdate?: (boardCards: BoardCard[]) => void;
    onNotesUpdate?: (notes: string) => void;
  }>({});

  // Initialize session data
  useEffect(() => {
    if (!sessionId || !userName) return;

    // Initialize session if it doesn't exist
    if (!sessionStorage.has(sessionId)) {
      sessionStorage.set(sessionId, {
        boardCards: [],
        brainstormNotes: '',
        onlineUsers: [],
        lastUpdated: Date.now()
      });
    }

    // Add user to session
    const sessionData = sessionStorage.get(sessionId)!;
    if (!sessionData.onlineUsers.includes(userName)) {
      sessionData.onlineUsers.push(userName);
      sessionStorage.set(sessionId, sessionData);
    }

    setOnlineUsers([...sessionData.onlineUsers]);
    setIsConnected(true);

    // Simulate connection delay
    const timer = setTimeout(() => {
      setIsConnected(true);
    }, 500);

    return () => {
      clearTimeout(timer);
      // Remove user from session on cleanup
      const currentData = sessionStorage.get(sessionId);
      if (currentData) {
        currentData.onlineUsers = currentData.onlineUsers.filter(user => user !== userName);
        if (currentData.onlineUsers.length === 0) {
          // Clean up empty sessions
          sessionStorage.delete(sessionId);
        } else {
          sessionStorage.set(sessionId, currentData);
        }
      }
    };
  }, [sessionId, userName]);

  const broadcastBoardUpdate = (boardCards: BoardCard[]) => {
    if (!sessionId || !isConnected) return;
    
    const now = Date.now();
    if (now - lastUpdateRef.current < 100) return; // Throttle updates
    
    lastUpdateRef.current = now;
    
    const sessionData = sessionStorage.get(sessionId);
    if (sessionData) {
      sessionData.boardCards = boardCards;
      sessionData.lastUpdated = now;
      sessionStorage.set(sessionId, sessionData);
    }
  };

  const broadcastNotesUpdate = (notes: string) => {
    if (!sessionId || !isConnected) return;
    
    const sessionData = sessionStorage.get(sessionId);
    if (sessionData) {
      sessionData.brainstormNotes = notes;
      sessionData.lastUpdated = Date.now();
      sessionStorage.set(sessionId, sessionData);
    }
  };

  const subscribeToUpdates = (
    onBoardUpdate: (boardCards: BoardCard[]) => void,
    onNotesUpdate: (notes: string) => void
  ) => {
    updateCallbacksRef.current = {
      onBoardUpdate,
      onNotesUpdate
    };
  };

  const refreshSession = () => {
    if (!sessionId) return;
    
    const sessionData = sessionStorage.get(sessionId);
    if (sessionData && updateCallbacksRef.current) {
      // Update online users
      setOnlineUsers([...sessionData.onlineUsers]);
      
      // Trigger updates if callbacks are set
      if (updateCallbacksRef.current.onBoardUpdate) {
        updateCallbacksRef.current.onBoardUpdate(sessionData.boardCards);
      }
      if (updateCallbacksRef.current.onNotesUpdate) {
        updateCallbacksRef.current.onNotesUpdate(sessionData.brainstormNotes);
      }
    }
  };

  const joinSession = (code: string): boolean => {
    // In a real implementation, this would validate the code with the server
    // For demo purposes, we'll simulate joining any valid 8-character code
    if (code.length === 8) {
      const sessionData = sessionStorage.get(code);
      if (sessionData) {
        // Add user to existing session
        if (!sessionData.onlineUsers.includes(userName)) {
          sessionData.onlineUsers.push(userName);
          sessionStorage.set(code, sessionData);
        }
        return true;
      } else {
        // Create new session with this code
        sessionStorage.set(code, {
          boardCards: [],
          brainstormNotes: '',
          onlineUsers: [userName],
          lastUpdated: Date.now()
        });
        return true;
      }
    }
    return false;
  };

  return {
    isConnected,
    onlineUsers,
    broadcastBoardUpdate,
    broadcastNotesUpdate,
    subscribeToUpdates,
    refreshSession,
    joinSession
  };
};