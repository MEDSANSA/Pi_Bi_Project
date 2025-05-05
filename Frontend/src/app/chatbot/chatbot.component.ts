import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatService } from '../Services/chat.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  isPopupOpen = false;
  userMessage = '';
  chatMessages: { sender: string, message: string }[] = [];

  constructor(private chatService: ChatService) { }

  togglePopup() {
    this.isPopupOpen = !this.isPopupOpen;
  }

  sendMessage() {
    const message = this.userMessage;
    this.chatMessages.push({ sender: 'user', message });

    this.chatService.sendMessage(message).subscribe(response => {
      this.chatMessages.push({ sender: 'bot', message: response.response });
    });

    this.userMessage = '';
  }
}
