import { Component, OnInit } from '@angular/core';
import { ChatService } from "../../services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message = '';
  elemento: any;

  constructor(public chatService: ChatService) { 
    this.chatService.loadMessages()
        .subscribe( () => {
          setTimeout(() => {
            this.elemento.scrollTop = this.elemento.scrollHeight;  
          }, (2000));
        });
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }

  sendMessage() {
    console.log(this.message)

    if (this.message.length == 0){
      return;
    }

    this.chatService.addMessage(this.message)
        .then( () => {
          console.log('Message sent');
          this.message = '';
        })
        .catch( (err) => console.error('An error occurred :( ', err));  
  }
}

