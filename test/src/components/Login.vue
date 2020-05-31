<template>
  <div id="app">
	  


  	<div class="container" v-if="!show">
  		<h2>Sign in</h2>
	    <div class="form-label-group">
			<label style="color: #FFF" for="inputEmail">Username</label>
			<input type="username" id="inputUsername" class="form-control"
			placeholder="Username" required autofocus v-model="username" style="width:300px; margin-left:auto;margin-right:auto;">
	  	</div>
	  	<div class="form-label-group">
		    <br>
		    <label style="color: #FFF" for="inputPassword">Password</label>
		    <input type="password" id="inputPassword" class="form-control"
		    placeholder="Password" required v-model="password" style="width:300px; margin-left:auto;margin-right:auto;">
	  	</div>

	  	<div class="container">
			  <a href="#" style="width:300px; margin-top: 20px" class="btn btn-sm animated-button thar-two" @click="checkLogin(true)">SIGN IN</a>
			  <a href="#" style="width:300px; margin-top: 20px" class="btn btn-sm animated-button thar-two" @click="createAccount(true)">CREATE ACCOUNT</a>
			  <a href="#" style="width:300px; margin-top: 20px" class="btn btn-sm animated-button thar-two" @click="backToEvents(true)">BACK TO EVENTS</a>
		</div>

	</div>
	
	<div v-if="show">
	<button class="btn btn-danger" @click="showSignIn(false)" style="float:right">X</button>
	<h2>Create account</h2>
    <b-form >
      <b-form-group
        id="input-group-1"
        label="Username:"
        label-for="input-1"
        style="width:300px; margin-left:auto;margin-right:auto; color:#FFF">
        <b-form-input
          id="input-1"
          type="text"
          v-model="addUserForm.username"
          required
          placeholder="Enter username"
          style="width:300px; margin-left:auto;margin-right:auto"
        ></b-form-input>
      </b-form-group>


      <b-form-group
        id="input-group-2"
        label="Password:"
        label-for="input-2"
        style="width:300px; margin-left:auto;margin-right:auto; color: #FFF">
        <b-form-input
          id="input-2"
          type="password"
          v-model="addUserForm.password"
          required
          placeholder="Enter password"
          style="width:300px; margin-left:auto;margin-right:auto;"
        ></b-form-input>
      </b-form-group>

	   <a href="#" style="display:inline-block;" class="btn btn-sm animated-button thar-two" :disabled="show" @click="submit()">Submit</a>
    	<a href="#" style="display:inline-block;" class="btn btn-sm animated-button thar-two" @click="initForm()">Reset</a>

    </b-form>
  </div>

  </div>


  






</template>



<script>

import axios from 'axios'

export default {
	data () {
	return {
		username: '',
		password: '',
		is_admin: 0,
		show: false,
		addUserForm: {username:'', password:''},
		accounts:{},
		money_available:0
		}
	},
	created() {
		//this.show = true
		//this.logged = this.$route.query.logged,
		//this.username = this.$route.query.username
	},

	methods: {
	getAccount(){
	 	var path = 'http://localhost:5000/account/'
		path = path.concat(this.username)


	  axios.get(path)
	    .then((res) => {
	      this.is_admin = res.data.accounts.is_admin
	      this.money_available = res.data.accounts.available_money

	       alert("Successful logged")

          this.$router.replace({ path: '/', query: { username: this.username ,logged: this.logged , token: this.token , money_available: this.money_available, is_admin : this.is_admin} })

	    })
	    .catch((error) => {
	      console.error(error)
	    })
	},
	initForm(){
		this.addUserForm.username = ''
		this.addUserForm.password = ''
	},
	submit(){
		const path = 'http://localhost:5000/account'
		

		const parameters = {
          username: this.addUserForm.username,
          password: this.addUserForm.password
        }
	  	axios.post(path, parameters)
	    .then((res) => {
	      console.log('User created')
	      alert("User created")
	      this.showSignIn(false)
	    })
	    .catch((error) => {
	      console.error(error)
	      alert("User already exist")
	    })
	},

	showSignIn(boolean){
		this.show = boolean
	},


	backToEvents(){
		this.$router.replace({ path: '/', query: { username: this.username, logged: this.logged } })
	},
	createAccount(){
        this.show = true;
	},
    checkLogin () {

      const parameters = {
        username: this.username,
        password: this.password
      }

      const path = `http://localhost:5000/login`
      axios.post(path, parameters)
        .then((res) => {
          this.logged = true
          this.token = res.data.token
          this.find_match = true

          this.getAccount()

          

        })
        .catch((error) => {
          //eslint-disable-next-line
          console.error(error)
          this.user = ''
          alert('Username or Password incorrect')
        })
    },

    emptyFields(){
    	return (this.addUserForm.username == '' && this.addUserForm.username == '')
    }

  }

}

</script>