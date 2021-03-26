var app = new Vue({
    el: '#app',
    data: {
        last_seen: 'Ultimo accesso oggi alle 12:00',
        deleted: [],
        closed: false,
        dropdown: false,
        clicked_message: undefined,
        search: '',
        send_message: '',
        current_user: 0,
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ]
    },
    methods: {
        submit(new_message) {
            if (new_message == '') {
                return;
            }
            let date = new Date();
            let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            this.contacts[this.current_user].messages.push({
                date: date.toLocaleDateString(undefined, options) + ' ' + date.toLocaleTimeString(),
                text: new_message,
                status: 'sent'
            });
            this.send_message = '';
            this.last_seen = this.contacts[this.current_user].name + ' sta scrivendo...';
            setTimeout(this.reply, 1000);
        },
        reply() {
            let date = new Date();
            let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            this.contacts[this.current_user].messages.push({
                date: date.toLocaleDateString(undefined, options) + ' ' + date.toLocaleTimeString(),
                text: 'Ok',
                status: 'received'
            });
            this.last_seen = 'Ultimo accesso oggi alle 12:00';
        },
        filterContacts() {
            this.contacts.forEach((contact, index) => {
                if (!contact.name.toLowerCase().includes(this.search.toLowerCase())) {
                    contact.visible = false;
                } else {
                    contact.visible = true;
                }
            });
        },
        showDropdown(counter) {
            if (this.dropdown && this.closed) {
                this.closed = false;
                this.dropdown = true;
                this.clicked_message = counter;
            } else {
                this.dropdown = true;
                this.clicked_message = counter;
            }
        },
        close() {
            this.closed = true;
            this.dropdown = false;
        },
        selectUser(index) {
            this.current_user = index;
            this.dropdown = false;
            this.closed = false;
        },
        deleteMessage(index, message) {
            if (message.text == 'Questo messaggio è stato eliminato.') {
                this.closed = true;
                this.dropdown = false;
                return;
            }
            this.closed = true;
            this.dropdown = false;
            this.contacts[this.current_user].messages[index].text = 'Questo messaggio è stato eliminato.';
            this.deleted.push(message);
        },
        checkIfDeleted(message) {
            if (this.deleted.includes(message)) {
                return 'color : grey';
            }
            return null;
        },
        showLastMsg(contact) {
            let msg = contact.messages[contact.messages.length - 1].text;
            if(msg.length > 27) {
                return msg.substring(0,27) + '...';
            }
            return msg;
        },
        showDate(contact) {
            let date = contact.messages[contact.messages.length - 1].status + ' ' + contact.messages[contact.messages.length - 1].date;
            return date;
        }
    }
});
