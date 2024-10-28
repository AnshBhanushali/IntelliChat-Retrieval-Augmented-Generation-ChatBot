export interface User {
    id: number;
    email: string;
  }
  
  export interface Message {
    id: number;
    text: string;
    sender: string;
    timestamp: Date;
  }
  