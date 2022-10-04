<template>
    <div>
		<div class="card">
			<div class="row g-0">
				<div class="col-12">
					<div class="py-2 px-4 border-bottom d-none d-lg-block">
						<div class="d-flex align-items-center py-1">
							<!--div class="position-relative">
								<img :src="activeContraPartyAvatar" class="rounded-circle mr-1" :alt="activeContraParty.username" width="40" height="40">
							</div-->
							<div class="flex-grow-1 pl-3">
								<strong>{{activeContraParty.username}}</strong>
								<div v-if="this.isTyping()" class="text-muted small"><em>Typing...</em></div>
							</div>
						</div>
					</div>

					<div class="position-relative">
						<div class="chat-messages p-4">
							<div v-for="msg in this.activeChat()" class="pb-4">
								<div v-if="msg.text" :class="[isMine(msg) ? 'chat-message-right' : 'chat-message-left']">
									<!--div>
										<img :src="getAvatarById(msg.sentBy)" class="rounded-circle mr-1" :alt="getUserNameById(msg.sentBy)" width="40" height="40">
										<div class="text-muted small text-nowrap mt-2">{{msg.time}}</div>
									</div-->
									<div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
										<div class="font-weight-bold mb-1">{{getUserNameById(msg.sentBy)}}</div>
										{{msg.text}}
									</div>
								</div>
								<div v-else-if="msg.status">
									<div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
										<div class="font-weight-bold mb-1 text-center">
										{{msg.status}} by {{getUserNameById(msg.sentBy)}}
											<span class="badge float-right bg-success rounded-pill" v-if="msg.status === 'accepted'"><i class="fa fa-fw fa-check"></i></span>
											<span class="badge float-right bg-primary rounded-pill" v-if="msg.status === 'inquiry'"><i class="fa fa-fw fa-question"></i></span>
											<span class="badge float-right bg-warning rounded-pill" v-if="msg.status === 'disputed'"><i class="fa fa-fw fa-exclamation"></i></span>
											<span class="badge float-right bg-danger rounded-pill" v-if="msg.status === 'canceled'"><i class="fa fa-fw fa-times"></i></span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="flex-grow-0 py-3 px-4 border-top">
						<div class="input-group">
							<input type="text" class="form-control" placeholder="Type your message" v-model="messageInput">
							<button class="btn btn-primary" @click="sendMessage()">Send</button>
						</div>
					</div>

				</div>
			</div>
		</div>
    </div>
</template>

<script>
import { Session } from 'meteor/session'
import Listings from '../../api/collections/Listings'
import Transactions from '../../api/collections/Transactions'

export default {
  data() {
/*    const txId = Session.get('activeTxId')
    if (!txId) return {}
    const tx = Transactions.findOne(txId)
    let contraPartyId
    if (Meteor.userId() === tx.listedBy) contraPartyId = tx.takenBy
    else if (Meteor.userId() === tx.takenBy) contraPartyId = tx.listedBy
    else contraPartyId = Meteor.userId()
    const contraParty = Meteor.users.findOne(contraPartyId)
    return {
        tx,
        contraParty 
    }*/
    return {
		messageInput: ''
	}
  },
  props: {
  },
  meteor: {
    activeTx() {
		console.log('Get active tx')
      const tx = Session.get('activeTx')
      console.log('Active tx is', tx)
      return tx || {}
    },
    activeContraParty() {
      const tx = Session.get('activeTx')
      console.log('Get active contraparty', tx)

      const nullUser = { username: "Not found", avatar: 'https://bootdey.com/img/Content/avatar/avatar1.png' }
      if (!tx) return nullUser
      let contraPartyId
      const userId = Meteor.userId()
      if (tx.listedBy === userId) contraPartyId = tx.takenBy
      else if (tx.takenBy === userId) contraPartyId = tx.listedBy
      else return nullUser
      return Meteor.users.findOne(contraPartyId) || nullUser
    },
	activeContraPartyAvatar() {
      return this.activeContraParty.avatar || 'https://bootdey.com/img/Content/avatar/avatar1.png'
    }
  },
  methods: {
	isMine(msg) {
		return msg.sentBy === Meteor.userId()
	},
    isTyping() {
        return false // TODO: implement
    },
	getUserNameById(userId) {
        const user = Meteor.users.findOne(userId)
        if (user) return user.username
        return 'Not found user'
    },
	getAvatarById(userId) {
        const user = Meteor.users.findOne(userId)
        if (user && user.avatar) return user.avatar
        return 'https://bootdey.com/img/Content/avatar/avatar1.png'
    },
	activeChat() {
		console.log('Get active chat')
      const tx = Session.get('activeTx')
	  if (!tx) return []
	  const chat = tx.chat
      console.log('Active chat is', chat)
      return chat || []
	},
    sendMessage() {
        Meteor.call('newChatMessage', { txId: Session.get('activeTx')._id, text: this.messageInput }, (err, res) => {
            if (!err) {
                this.messageInput = ''
				const activeTx = Session.get('activeTx')
				Session.set('activeTx', Transactions.findOne(activeTx._id) ) // to trigger reactive ui update
            }
        })
    },
  },
}
</script>

<style scoped>
.chat-online {
    color: #34ce57
}

.chat-offline {
    color: #e4606d
}

.chat-messages {
    display: flex;
    flex-direction: column;
    max-height: 800px;
    overflow-y: scroll
}

.chat-message-left,
.chat-message-right {
    display: flex;
    flex-shrink: 0
}

.chat-message-left {
    margin-right: auto
}

.chat-message-right {
    flex-direction: row-reverse;
    margin-left: auto
}
.py-3 {
    padding-top: 1rem!important;
    padding-bottom: 1rem!important;
}
.px-4 {
    padding-right: 1.5rem!important;
    padding-left: 1.5rem!important;
}
.flex-grow-0 {
    flex-grow: 0!important;
}
.border-top {
    border-top: 1px solid #dee2e6!important;
}
.float-right {
    float: right;
}
.chat-messages > div {
    position: relative;
}
.chat-messages span.badge {
    margin: 0;
    padding: 0.3em 0.2em;
    position: absolute;
    right: -8px;
    font-size: 1em;
}
</style>