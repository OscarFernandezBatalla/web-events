<template>
  <div id="app" style="margin-top:0px">


    



    <div class="container" style="max-width: 100%; align-items:center; position: fixed; top: 0; background-color:#343a40">
      <div v-if=logged class="container" style="display: inline-block; width:auto;float:left; text-align:left">
        <h4> Total tickets in cart: {{ tickets_bought }} </h4>
        <h4> Money available: {{ money_available }} </h4>
      </div>

      <div class="container" style="display: inline-block; float:right; width:auto; margin-top:10px; margin-bottom:7px">
        <a href="#" style="display:inline-block;" v-if="!is_admin" class="btn btn-sm animated-button thar-two" :disabled="show" @click="showCartView(true)">View Cart</a>
        <a href="#" style="display:inline-block;" class="btn btn-sm animated-button thar-two" @click="login()">{{ this.textLoginButton() }}</a>
      </div>
    </div>


  

    <div class="overlay" style="margin-top: 60px"></div>
    <video v-if="!show" playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
      <source src="/static/video2.mp4" type="video/mp4">
    </video>



   




    <div v-if="is_admin">
      <a href="#" style="display:inline-block; width:auto" class="btn btn-sm animated-button thar-two" @click="showAddNewEvent(true)"> Add New Event </a>
      <a href="#" style="display:inline-block; width:auto" class="btn btn-sm animated-button thar-two" @click="showUpdateEvent(true)"> Update Event </a>

    </div>


    <div v-if="show_form_new_event">
      <h3>Add New Event</h3>
      <button class="btn btn-lg btn-blue-cross fixed" type="submit" @click="showAddNewEvent(false)" style="float:right">X</button>
        <b-form style="color: #FFF">
          <b-form-group
            id="input-group-1"
            label="Name:"
            label-for="input-1"
            style="width:300px; margin-left:auto;margin-right:auto;">
            <b-form-input
              id="input-1"
              type="text"
              v-model="newEventForm.name"
              required
              placeholder="Enter event name"
              style="width:300px; margin-left:auto;margin-right:auto;"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Price:"
            label-for="input-2"
            style="width:300px; margin-left:auto;margin-right:auto;">
            <b-form-input
              id="input-2"
              type="number"
              v-model="newEventForm.price"
              required
              placeholder="Enter price"
              style="width:300px; margin-left:auto;margin-right:auto;"
            ></b-form-input>
          </b-form-group>


          <b-form-group
            id="input-group-3"
            label="Date:"
            label-for="input-3"
            style="width:300px; margin-left:auto;margin-right:auto;">
            <b-form-input
              id="input-3"
              type="text"
              v-model="newEventForm.date"
              required
              placeholder="Enter date"
              style="width:300px; margin-left:auto;margin-right:auto;"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="City:"
            label-for="input-4"
            style="width:300px; margin-left:auto;margin-right:auto;">
            <b-form-input
              id="input-4"
              type="text"
              v-model="newEventForm.city"
              required
              placeholder="Enter city"
              style="width:300px; margin-left:auto;margin-right:auto;"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-5"
            label="Place:"
            label-for="input-5"
            style="width:300px; margin-left:auto;margin-right:auto;">
            <b-form-input
              id="input-5"
              type="text"
              v-model="newEventForm.place"
              required
              placeholder="Enter place"
              style="width:300px; margin-left:auto;margin-right:auto;"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-6"
            label="Tickets:"
            label-for="input-6"
            style="width:300px; margin-left:auto;margin-right:auto;">
            <b-form-input
              id="input-6"
              type="number"
              v-model="newEventForm.tickets"
              required
              placeholder="Enter tickets"
              style="width:300px; margin-left:auto;margin-right:auto;"
            ></b-form-input>
          </b-form-group>
          <a href="#" style="width:300px; margin-top: 7px" class="btn btn-sm animated-button thar-two"  @click="submitAddEvent()" >Submit</a>
          <a href="#" style="width:300px; margin-top: 7px" class="btn btn-sm animated-button thar-two-red" @click="onReset()">Reset</a>
        </b-form>
      </div>

    <div v-if="show_form_update_event">
      <h3>UPDATE EVENT</h3>
      <button class="btn btn-lg btn-blue-cross fixed" type="submit" @click="showUpdateEvent(false)" style="float:right">X</button>
        <b-form style="color: #FFF">
        
          <b-form-group
            id="input-group-0"
            label="Id:"
            label-for="input-0"
            style="width:300px; margin-left:auto;margin-right:auto;">
            <b-form-input
              id="input-0"
              type="number"
              v-model="editEventForm.id"
              required
              placeholder="Enter event id"
              style="width:300px; margin-left:auto;margin-right:auto;"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-1"
            label="Name:"
            label-for="input-1"
            style="width:300px; margin-left:auto;margin-right:auto;">
            <b-form-input
              id="input-1"
              type="text"
              v-model="editEventForm.name"
              required
              placeholder="Enter event name"
              style="width:300px; margin-left:auto;margin-right:auto;"
            ></b-form-input>
          </b-form-group>


          <b-form-group
            id="input-group-2"
            label="Price:"
            label-for="input-2"
            style="width:300px; margin-left:auto;margin-right:auto;">
            <b-form-input
              id="input-2"
              type="number"
              v-model="editEventForm.price"
              required
              placeholder="Enter price"
              style="width:300px; margin-left:auto;margin-right:auto;"
            ></b-form-input>
          </b-form-group>


          <b-form-group
            id="input-group-3"
            label="Date:"
            label-for="input-3"
            style="width:300px; margin-left:auto;margin-right:auto;">
            <b-form-input
              id="input-3"
              type="text"
              v-model="editEventForm.date"
              required
              placeholder="Enter date"
              style="width:300px; margin-left:auto;margin-right:auto;"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="City:"
            label-for="input-4"
            style="width:300px; margin-left:auto;margin-right:auto;">
            <b-form-input
              id="input-4"
              type="text"
              v-model="editEventForm.city"
              required
              placeholder="Enter city"
              style="width:300px; margin-left:auto;margin-right:auto;"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-5"
            label="Place:"
            label-for="input-5"
            style="width:300px; margin-left:auto;margin-right:auto;">
            <b-form-input
              id="input-5"
              type="text"
              v-model="editEventForm.place"
              required
              placeholder="Enter place"
              style="width:300px; margin-left:auto;margin-right:auto;"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-6"
            label="Tickets:"
            label-for="input-6"
            style="width:300px; margin-left:auto;margin-right:auto;">
            <b-form-input
              id="input-6"
              type="number"
              v-model="editEventForm.tickets"
              required
              placeholder="Enter tickets"
              style="width:300px; margin-left:auto;margin-right:auto;"
            ></b-form-input>
          </b-form-group>
          <a href="#" style="width:300px; margin-top: 7px" class="btn btn-sm animated-button thar-two"  @click="submitUpdate()" >Submit</a>
          <a href="#" style="width:300px; margin-top: 7px" class="btn btn-sm animated-button thar-two-red" @click="onResetUpdate()">Reset</a>
        </b-form>
      </div>

    <div v-if="show_form_add_artist">
      <h3>Add artist</h3>
      <button class="btn btn-lg btn-blue-cross fixed" type="submit" @click="showAddArtist(false)" style="float:right">X</button>
        <b-form style="color: #FFF">

          <b-form-group
            id="input-group-1"
            label="Name artist:"
            label-for="input-1"
            style="width:300px; margin-left:auto;margin-right:auto;">
            <b-form-input
              id="input-1"
              type="text"
              v-model="addArtistForm.name"
              required
              placeholder="Enter artist name"
              style="width:300px; margin-left:auto;margin-right:auto;"
            ></b-form-input>
          </b-form-group>


          <b-form-group
            id="input-group-2"
            label="Country artist:"
            label-for="input-2"
            style="width:300px; margin-left:auto;margin-right:auto;">
            <b-form-input
              id="input-2"
              type="text"
              v-model="addArtistForm.country"
              required
              placeholder="Enter country artist"
              style="width:300px; margin-left:auto;margin-right:auto;"
            ></b-form-input>
          </b-form-group>


          <b-form-group
            id="input-group-3"
            label="Genre:"
            label-for="input-3"
            style="width:300px; margin-left:auto;margin-right:auto;">
            <b-form-input
              id="input-3"
              type="text"
              v-model="addArtistForm.genre"
              required
              placeholder="Enter genre"
              style="width:300px; margin-left:auto;margin-right:auto;"
            ></b-form-input>
          </b-form-group>

          <a href="#" style="width:300px; margin-top: 7px" class="btn btn-sm animated-button thar-two"  @click="submitAddArtist()" >Submit</a>
          <a href="#" style="width:300px; margin-top: 7px" class="btn btn-sm animated-button thar-two-red" @click="onResetAddArtistInEvent()">Reset</a>

        </b-form>
      </div>

    <div v-if="show_form_delete_artist">
      <h3>DELETE ARTIST</h3>
      <button class="btn btn-lg btn-blue-cross fixed" type="submit" @click="showDeleteArtist(false)" style="float:right">X</button>
        <b-form style="color: #FFF">
          <b-form-group
            id="input-group-1"
            label="Name:"
            label-for="input-1"
            style="width:300px; margin-left:auto;margin-right:auto;">
            <b-form-input
              id="input-1"
              type="text"
              v-model="form_delete_artist.name"
              required
              placeholder="Enter artist name"
              style="width:300px; margin-left:auto;margin-right:auto;"
            ></b-form-input>
          </b-form-group>
          <a href="#" style="width:300px; margin-top: 7px" class="btn btn-sm animated-button thar-two"  @click="submitDeleteArtist()" >Submit</a>
          <a href="#" style="width:300px; margin-top: 7px" class="btn btn-sm animated-button thar-two-red" @click="onResetDeleteArtist()">Reset</a>
        </b-form>
      </div>

    <div v-if="!form_new_event">
    









      <div id="popup1" class="popup">
        <div class="content">
          Event added to cart!
        </div>
      </div>







    




    
    
    <div class="container" id="eventsView" v-if="!show">
      <div class="row">
      <div class="col-lg-4 col-md-6 mb-4" v-for="(event) in events" :key="event.id" style="width:75%; margin-left:auto;margin-right:auto;">

        <br>

        <div class="card" style="width: 18rem;">

          <img class="card-img-top" v-bind:src="loadImage(event)" alt="Card image cap" id="card_img" style="height: 150px; border: 1px solid rgba(0, 0, 0, 0.125); border-bottom:0px; border-color: #000">
          <div class="card-body">
            <h5 style="color: #F7CA18" class="card-title">{{ event.name }}</h5>
            <p class="card-text">

                 <ul class="navigation">
                  <a class="main">ARTISTS</a>
                    <li :class=varName(index) v-for="(artist, index) in event.artists" :key="artist.id"><a>{{ artist.name }}</a></li>

                </ul>

  
              <h6 style="color: #FFF">{{ event.city }}</h6>
              <h6 style="color: #FFF">{{ event.place }}</h6>
              <h6 style="color: #FFF">{{ event.date }}</h6>
              <h6 style="color: #FFF">{{ event.price }} €</h6>
            </p>
          </div>


          <div class="container" style="background-color: transparent; padding: 10px; border: 2px solid rgba(0, 0, 0, 0.125); border-bottom:0px; border-right:0px; border-left:0px;border-color: #F7CA18">
            <h6 style="margin-bottom: 0rem">Tickets disponibles: {{ event.total_available_tickets }}</h6>
              <a href="#" style="margin-top: 10px; margin-bottom:1.5rem; height:50px" v-if="!is_admin && logged" class="btn btn-sm animated-button thar-two" :disabled="disAddCart(event)" @click="addToCart(event)">Add to cart</a>
              
              <a href="#" v-if="is_admin" style="width:auto; margin-top: 7px; height:50px" class="btn btn-sm animated-button thar-two" @click="showAddArtistForm(event)"> Add Artist to Event </a>
              <a href="#" v-if="is_admin" style="width:auto; margin-top: 7px; height:50px" class="btn btn-sm animated-button thar-two-red" @click="showDeleteArtistForm(event)"> Delete Artist in Event </a>

          </div>
        </div>
      </div>
    </div>
  </div>


  <div class="container" id="cartView" v-if="show" style="color: #FFF; margin-top: 120px">




    <!-- Modal HTML -->
    <div id="myModal" class="modal fade">
      <div class="modal-dialog modal-confirm">
        <div class="modal-content">
          <div class="modal-header">
            <div class="icon-box">
              <i class="material-icons">&#xE876;</i>
            </div>				
            <h4 class="modal-title">Awesome!</h4>	
          </div>
          <div class="modal-body">
            <p class="text-center">Your booking has been confirmed. Check your email for detials.</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-success btn-block" data-dismiss="modal">OK</button>
          </div>
        </div>
      </div>
    </div> 




    <h3> Cart </h3>
    <table style="width:75%; margin-left:auto;margin-right:auto;" id="tab">
      <thead>
        <tr>
          <th>Event Name</th>
          <th>Quantity</th>
          <th>Price(€)</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody v-for="(event, index) in this.events_added">
        <tr>
          <td>{{ event.name }}</td>
          <td>
            <h5> {{ quantity_events_added[event.name] }}
              <button class="skewBtnG green" @click="addTicket(event)">+</button>
              <button class="skewBtnR brick" @click="substractTicket(event)" >-</button>
            </h5>
          </td>
          <td>{{ event.price }}</td>
          <td>{{ event.price * quantity_events_added[event.name] }}</td>
          <td>
            <button class="skewBtnR brick" style="width:auto" @click="deleteTicket(event)">Delete ticket</button>
          </td>
        </tr>
      </tbody>
    </table>
    <a href="#"  style="display:inline-block;" class="btn btn-sm animated-button thar-two" @click="back">Back</a>
    <a href="#myModal" data-toggle="modal" style="display:inline-block; width:auto" class="btn btn-sm animated-button thar-two" :disabled="empty_cart" @click="finalizePurchase">Finalize purchase</a>

  </div>


  </div>
</div>
</template>
<script>

import axios from 'axios'

export default {
  data () {
    return {
      message: 'Buy your ticket!',
      tickets_bought: 0,
      money_available: 1000,
      price: 20,
      events_added: [],
      quantity_events_added: {},
      events: {},
      show: false,
      empty_cart: true,
      im: '/static/Festival Cruilla 2020.png',
      login_bool: false,
      logged: false,
      username: "",
      token: '',
      dataType: "n1",

      total_price: 0,



      newEventForm: {name : "", price : 0,date : "",city : "",place : "", tickets: 0},
      show_form_new_event : false,
      show_form_update_event : false,
      show_form_add_artist : false,
      show_form_delete_artist : false,
      is_admin: 0,
      //id_artist:'',
      event_to_modify: {},
      editEventForm: {id: '',name: '',place: '',city: '',date: '',price: '',total_available_tickets: ''},
      addArtistForm: {id: '', name: '',country: '',genre: ''},
      form_delete_artist: {id: '', name: ''}

    }
  },

  created() {
    this.getEvents();
    this.logged = this.$route.query.logged
    if(this.logged == undefined){
      this.logged = false
    }

    this.username = this.$route.query.username,
      this.token = this.$route.query.token

      if (this.logged){
        this.getAccount()
      }
    
  },

  methods: {
    varName(index){
      if(index == 0){
        return "n1"
      }
      else if(index == 1){
        return "n2"
      }
      else if(index == 2){
        return "n3"
      }
      else if(index == 3){
        return "n4"
      }
      else{
        return "n5"
      }
    },
    getEvents () {
      const path = 'http://localhost:5000/events'
      axios.get(path)
        .then((res) => {
          this.events = res.data.events
        })
        .catch((error) => {
          console.error(error) 
        })
    },
    
    getAccount(){
      var path = 'http://localhost:5000/account/'
      path = path.concat(this.username)


	    axios.get(path)
	    .then((res) => {
        this.is_admin = res.data.account.is_admin
        this.money_available = res.data.account.available_money
	    })
	    .catch((error) => {
	      console.error(error)
	    })
  	},
    
    updateMoney(){
      var path = 'http://localhost:5000/account/'

      path = path.concat(this.username)

      axios.get(path)
      .then((res) => {
        this.money_available = res.data.accounts.available_money
        console.log("then")
        console.log(this.money_available)

      })
      .catch((error) => {
        console.error(error)
      })
    },

    addPurchase(parameters) {

      const path = 'http://localhost:5000/orders/'

      //var path = 'http://localhost:5000/login/'
    
      var path2 = path.concat(this.username)

      axios.post(path2, parameters, {
        auth: {username: this.token}
      })
        .then(() => {
          console.log('Order done')
          this.updateMoney()
          this.getEvents()
          this.quantity_events_added = {}

        })
        .catch((error) => {

          // eslint-disable-next-line

          console.log(error)
          alert(error.response.data.message)
          this.getEvents()
        })
    },

    addToCart(event) {
      if (event.price <= this.money_available) {
        this.tickets_bought += 1

        if (event.name in this.quantity_events_added){
          this.quantity_events_added[event.name] += 1
        }
        else{
          this.quantity_events_added[event.name] = 1 
        }
        if(!this.events_added.includes(event)){
          this.events_added.push(event)
        }

        this.isCartEmpty()
      }
    },

    login() {
      //if(!this.login_bool){
      //  this.login_bool = true,
      this.$router.replace({ path: '/userlogin' })

      //}
      
    },

    addTicket(event) {
      if (event.price * this.quantity_events_added[event.name] < this.money_available) {
        this.showCartView(false),

        this.quantity_events_added[event.name] += 1,
        this.tickets_bought += 1,

        //setTimeout(() => this.showCartView(true), 1000)
        this.$nextTick(() => {
          this.showCartView(true);
        });
      }
    },

    substractTicket(event) {
      this.showCartView(false),
      this.quantity_events_added[event.name] -= 1,
      this.tickets_bought -= 1

      if(this.quantity_events_added[event.name] == 0){
        if (this.events_added.indexOf(event) > -1) {
          this.events_added.splice(this.events_added.indexOf(event), 1);
        }
      }

      this.isCartEmpty()

      //setTimeout(() => this.showCartView(true), 1)
      this.$nextTick(() => {
        this.showCartView(true);
      });

    },

    deleteTicket(event){
      this.showCartView(false),
      this.tickets_bought -= this.quantity_events_added[event.name]

      this.quantity_events_added[event.name] = 0

      if (this.events_added.indexOf(event) > -1) {
        this.events_added.splice(this.events_added.indexOf(event), 1);
      }

      this.isCartEmpty()

      this.$nextTick(() => {
        this.showCartView(true);
      });
    },

    back() {
      this.showCartView(false)
    },

    textLoginButton(){
      if(this.logged){
        return "LOGOUT"
      }
      return "LOGIN"
    },

    finalizePurchase() {
      console.log(this.token)
      for (let i = 0; i < this.events_added.length; i += 1) {
        const parameters = {
          id_event: this.events_added[i].id,
          tickets_bought: this.quantity_events_added[this.events_added[i].name]
        }
        this.addPurchase(parameters)
      }
      this.events_added = []
      this.back()
      alert("Event bought!")
      this.isCartEmpty()
    },

    showCartView(boolean) {
      this.show = boolean
    },

    isCartEmpty() {
      this.empty_cart = this.events_added.length == 0
    },

    loadImage(event) {
      //var name = '/static/';
      //name.concat(event.name,'.png')
      if(event.name == "Festival Cruilla 2020"){
        return '/static/Festival Cruilla 2020.png'
      }

      else if(event.name == "Canet Rock 2020"){
        return '/static/Canet Rock 2020.png'
      }
      return '/static/common_event.png'
      
      //else{
      //  this.im = '/static/common_event.png'
      //}

    },

    isEventInCart(event) {
      //var name = '/static/';
      //name.concat(event.name,'.png')
      return this.events_added.includes(event)
      
      //else{
      //  this.im = '/static/common_event.png'
      //}

    },

    disAddCart(event){
      if(event.total_available_tickets == 0 || this.isEventInCart(event || this.money_available < event.price)){
        return true
      }
      return false
    },

    showAddNewEvent(boolean) {
      this.show_form_new_event = boolean

      this.show_form_update_event = false
      this.show_form_add_artist = false
      this.show_form_delete_artist = false

      this.onReset()
    },

    showUpdateEvent(boolean) {

      this.show_form_update_event = boolean

      this.show_form_new_event = false
      this.show_form_add_artist = false
      this.show_form_delete_artist = false

      this.onResetUpdate()
    },

    showDeleteArtist(boolean) {
      this.show_form_delete_artist = boolean

      this.show_form_new_event = false
      this.show_form_update_event = false
      this.show_form_add_artist = false

      this.onResetDeleteArtist()
    },

    showAddArtist(boolean) {
      this.show_form_add_artist = boolean

      this.show_form_new_event = false
      this.show_form_update_event = false
      this.show_form_delete_artist = false

      this.onResetAddArtistInEvent()
    },

    submitAddEvent() {
      const path = 'http://localhost:5000/event'
      //var path2 = path.concat(this.username)

      //console.log("user")
      //console.log(this.username)
      const parameters = {
          name: this.newEventForm.name,
          place: this.newEventForm.place,
          city: this.newEventForm.city,
          date: this.newEventForm.date,
          price: this.newEventForm.price,
          total_available_tickets: this.newEventForm.tickets
        }

      axios.post(path, parameters, {
        auth: {username: this.token}
      }).then(() => {
          console.log('Event added')
          this.getEvents()
          this.showAddNewEvent(false)
          alert("New Event Added")

        })
        .catch((error) => {

          // eslint-disable-next-line

          console.log(error)
          alert(error.response.data.message)
          //this.getEvents()
        })
    },

    submitAddArtist(event) {
      this.addNewArtist()
      //this.addArtistInEvent(id_artist)
    },

    submitDeleteArtist() {
      var path = 'http://localhost:5000/event/'
      path = path.concat(this.event_to_modify.id,'/artists')

      axios.get(path, {
        auth: {username: this.token}
      }).then((res) => {
          var artists = res.data.artists
          var deleted = false

          for (let i = 0; i < artists.length; i += 1) {
            if (this.form_delete_artist.name == artists[i]['name']){
              this.deleteArtist(artists[i]['id'])
              deleted = true
            }
          }
          
          if (!deleted){
            alert("Artist not exists in event")
          }

          this.getEvents()
          

        })
        .catch((error) => {

          // eslint-disable-next-line

          console.log(error)
          //this.getEvents()
        })



      
    },

    deleteArtist(id_artist){

      var path = 'http://localhost:5000/event/'
      path = path.concat(this.event_to_modify.id, '/artist/', id_artist)

      axios.delete(path, {
        auth: {username: this.token}
      }).then(() => {
          console.log('Artist deleted')
          this.getEvents()
          this.showDeleteArtist(false)
          alert("Artist deleted")

        })
        .catch((error) => {

          // eslint-disable-next-line

          console.log(error)
          alert(error.response.data.message)
          //this.getEvents()
        })

    },

    submitUpdate() {
      const path = 'http://localhost:5000/event/'
      var path2 = path.concat(this.editEventForm.id)

      //console.log("user")
      //console.log(this.username)
      const parameters = {
          name: this.editEventForm.name,
          price: this.editEventForm.price,
          date: this.editEventForm.date,
          city: this.editEventForm.city,
          place: this.editEventForm.place,
          total_available_tickets: this.editEventForm.tickets
        }

      axios.put(path2, parameters, {
        auth: {username: this.token}
      }).then(() => {
          console.log('Event updated')
          this.getEvents()
          this.showUpdateEvent(false)
          alert("Event Updated")

        })
        .catch((error) => {

          // eslint-disable-next-line

          console.log(error)
          alert(error.response.data.message)
          //this.getEvents()
        })
    },

    onResetUpdate(){
      id: this.editEventForm.id = ""
      name: this.editEventForm.name = ""
      price: this.editEventForm.price = 0
      date: this.editEventForm.date = ""
      country: this.editEventForm.country = ""
      city: this.editEventForm.city = ""
      place: this.editEventForm.place = ""
      tickets: this.editEventForm.tickets = 0
    },

    onResetDeleteArtist(){
      id: this.form_delete_artist.id = ""
      name: this.form_delete_artist.name = ""
    },

    onResetAddArtistInEvent(){
      id: this.addArtistForm.id = ""
      name: this.addArtistForm.name = ""
      country: this.addArtistForm.country = ""
      genre: this.addArtistForm.genre = ""
    },

    onReset(){
      name: this.newEventForm.name = ""
      price: this.newEventForm.price = 0
      date: this.newEventForm.date = ""
      country: this.newEventForm.country = ""
      city: this.newEventForm.city = ""
      place: this.newEventForm.place = ""
      tickets: this.newEventForm.tickets = 0
    },

    showAddArtistForm(event){
      this.eventWhereModifyArtist(event)
      this.showAddArtist(true)
    },

    showDeleteArtistForm(event){
      this.eventWhereModifyArtist(event)
      this.showDeleteArtist(true)
    },

    eventWhereModifyArtist (event) {
      this.event_to_modify = event
    },

    addNewArtist(){
      const path = 'http://localhost:5000/artist'
      //var path2 = path.concat(this.username)

      //console.log("user")
      //console.log(this.username)
      const parameters = {
          name: this.addArtistForm.name,
          country: this.addArtistForm.country,
          genre: this.addArtistForm.genre    
      }

      axios.post(path, parameters, {
        auth: {username: this.token}
      }).then((res) => {
          //this.id_artist = res.data.id_artist
          this.addArtistInEvent(res.data.artist.id)



          
          //this.getEvents()
          //this.showAddArtist(false)

        })
        .catch((error) => {
          // eslint-disable-next-line

          alert(error.response.data.message)

          //this.getEvents()
        })
    },

    addArtistInEvent(id_artist){
      const path = 'http://localhost:5000/event2/'
      var path2 = path.concat(this.event_to_modify.id, '/artist')

      //console.log("user")
      //console.log(this.username)
      const parameters = {
          idArtist: id_artist
      }

      console.log(id_artist)

      axios.post(path2, parameters, {
        auth: {username: this.token}
      }).then(() => {
          this.getEvents()
          this.showAddArtist(false)
          alert("Artist Added to Event")


        })
        .catch((error) => {

          // eslint-disable-next-line

          console.log(error)
          alert(error.response.data.message)
          //this.getEvents()
        })
    },
  },
}

</script>