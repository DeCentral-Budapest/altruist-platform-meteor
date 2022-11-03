<template>
		<div class="card-body">
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
											<span class="badge float-right rounded-pill" :class="bgClass(msg.status)"><i class="fa fa-fw" :class="faClass(msg.status)"></i></span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="flex-grow-0 py-3 border-top">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <input type="checkbox" aria-label="Checkbox for following text input disabled" disabled>
                </div>
              </div>
              <input type="text" class="form-control" placeholder="Type your message" v-model="messageInput" v-on:keyup.enter="sendMessage()">
              <div class="input-group-append">
                <button class="btn btn-primary" @click="sendMessage()">Send <i class="fa fa-fw fa-paper-plane"></i></button>
              </div>
            </div>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
import { Session } from 'meteor/session'
import Listings from '/imports/api/collections/Listings'
import Deals from '/imports/api/collections/Deals'

export default {
  data() {
/*    const dealId = Session.get('activeDealId')
    if (!dealId) return {}
    const deal = Deals.findOne(dealId)
    let contraPartyId
    if (Meteor.userId() === deal.listedBy) contraPartyId = deal.takenBy
    else if (Meteor.userId() === deal.takenBy) contraPartyId = deal.listedBy
    else contraPartyId = Meteor.userId()
    const contraParty = Meteor.users.findOne(contraPartyId)
    return {
        deal,
        contraParty 
    }*/
    return {
		messageInput: ''
	}
  },
  props: {
  },
  meteor: {
    activeContraParty() {
      const deal = Session.get('activeDeal')
      console.log('Get active contraparty', deal)

      const nullUser = { username: "Not found", avatar: 'https://bootdey.com/img/Content/avatar/avatar1.png' }
      if (!deal) return nullUser
      let contraPartyId
      const userId = Meteor.userId()
      if (deal.listedBy === userId) contraPartyId = deal.takenBy
      else if (deal.takenBy === userId) contraPartyId = deal.listedBy
      else return nullUser
      return Meteor.users.findOne(contraPartyId) || nullUser
    },
	activeContraPartyAvatar() {
      return this.activeContraParty.avatar || 'https://bootdey.com/img/Content/avatar/avatar1.png'
    }
  },
  methods: {
    activeDeal() {
	  console.log('Get active deal')
      let deal = Session.get('activeDeal')
      console.log('Active deal is', deal)
      deal = Deals._transform(deal)
      return deal || {}
    },
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
    bgClass(status) {
       return this.activeDeal()?.getStatusObject(status).bgClass
    },
    faClass(status) {
       return this.activeDeal()?.getStatusObject(status).faClass
    },
	activeChat() {
	  console.log('Get active chat')
      const deal = Session.get('activeDeal')
	  if (!deal) return []
	  const chat = deal.chat
      console.log('Active chat is', chat)
      return chat || []
	},
    sendMessage() {
        Meteor.call('newChatMessage', { dealId: Session.get('activeDeal')._id, text: this.messageInput }, (err, res) => {
            if (!err) {
                this.messageInput = ''
				const activeDeal = Session.get('activeDeal')
				Session.set('activeDeal', Deals.findOne(activeDeal._id) ) // to trigger reactive ui update
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
.chat-message-right, .chat-message-left {
    max-width: 90%;
}
.chat-message-right .rounded {
    border-bottom-right-radius: unset !important;
}
.chat-message-left .rounded {
    border-bottom-left-radius: unset !important;
}
.input-group-text {
    border-radius: 0.375rem 0 0 0.375rem;
    height: 100%;
    margin-right: -1px;
}
.input-group-append .btn {
    border-top-left-radius: unset;
    border-bottom-left-radius: unset;
}
.input-group input.form-control {
    border-radius: unset;
}
</style>