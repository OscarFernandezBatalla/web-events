webpackJsonp([1],{"9RkC":function(t,e){},NHnr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("Tqaz"),a=(i("sWs5"),i("7+uW")),r={render:function(){var t=this.$createElement;return(this._self._c||t)("router-view")},staticRenderFns:[]};var s=i("VU/8")({name:"App"},r,!1,function(t){i("9RkC")},null,null).exports,o=i("/ocq"),u=i("mtWM"),c=i.n(u),d={data:function(){return{message:"Buy your ticket!",tickets_bought:0,money_available:1e3,price:20,events_added:[],quantity_events_added:{},events:{},show:!1,empty_cart:!0,im:"/static/Festival Cruilla 2020.png",login_bool:!1,logged:!1,username:"",token:"",newEventForm:{name:"",price:0,date:"",city:"",place:"",tickets:0},show_form_new_event:!1,show_form_update_event:!1,show_form_add_artist:!1,show_form_delete_artist:!1,is_admin:0,event_to_modify:{},editEventForm:{id:"",name:"",place:"",city:"",date:"",price:"",total_available_tickets:""},addArtistForm:{id:"",name:"",country:"",genre:""},form_delete_artist:{id:"",name:""}}},created:function(){this.getEvents(),this.logged=this.$route.query.logged,this.username=this.$route.query.username,this.token=this.$route.query.token,this.money_available=this.$route.query.money_available,this.is_admin=this.$route.query.is_admin},methods:{getEvents:function(){var t=this;c.a.get("https://a2-eventright.herokuapp.com/events").then(function(e){t.events=e.data.events}).catch(function(t){console.error(t)})},updateMoney:function(){var t=this,e="https://a2-eventright.herokuapp.com/account/";e=e.concat(this.username),c.a.get(e).then(function(e){t.money_available=e.data.accounts.available_money,console.log("then"),console.log(t.money_available)}).catch(function(t){console.error(t)})},addPurchase:function(t){var e=this,i="https://a2-eventright.herokuapp.com/orders/".concat(this.username);c.a.post(i,t,{auth:{username:this.token}}).then(function(){console.log("Order done"),e.updateMoney(),e.getEvents(),e.quantity_events_added={}}).catch(function(t){console.log(t),e.getEvents()})},addToCart:function(t){t.event.price<=this.money_available&&(this.tickets_bought+=1,t.event.name in this.quantity_events_added?this.quantity_events_added[t.event.name]+=1:this.quantity_events_added[t.event.name]=1,this.events_added.includes(t)||this.events_added.push(t),this.isCartEmpty())},login:function(){this.login_bool||(this.login_bool=!0,this.$router.replace({path:"/userlogin"}))},addTicket:function(t){var e=this;t.event.price<=this.money_available&&(this.showCartView(!1),this.quantity_events_added[t.event.name]+=1,this.tickets_bought+=1,this.$nextTick(function(){e.showCartView(!0)}))},substractTicket:function(t){var e=this;this.showCartView(!1),this.quantity_events_added[t.event.name]-=1,this.tickets_bought-=1,0==this.quantity_events_added[t.event.name]&&this.events_added.indexOf(t)>-1&&this.events_added.splice(this.events_added.indexOf(t),1),this.isCartEmpty(),this.$nextTick(function(){e.showCartView(!0)})},deleteTicket:function(t){var e=this;this.showCartView(!1),this.tickets_bought-=this.quantity_events_added[t.event.name],this.quantity_events_added[t.event.name]=0,this.events_added.indexOf(t)>-1&&this.events_added.splice(this.events_added.indexOf(t),1),this.isCartEmpty(),this.$nextTick(function(){e.showCartView(!0)})},back:function(){this.showCartView(!1)},finalizePurchase:function(){console.log(this.token);for(var t=0;t<this.events_added.length;t+=1){var e={id_event:this.events_added[t].event.id,tickets_bought:this.quantity_events_added[this.events_added[t].event.name]};this.addPurchase(e)}this.events_added=[],this.back(),alert("Event bought!"),this.isCartEmpty()},showCartView:function(t){this.show=t},isCartEmpty:function(){this.empty_cart=0==this.events_added.length},loadImage:function(t){return"Festival Cruilla 2020"==t.event.name?"/static/Festival Cruilla 2020.png":"Canet Rock 2020"==t.event.name?"/static/Canet Rock 2020.png":"/static/common_event.png"},isEventInCart:function(t){return this.events_added.includes(t)},showAddNewEvent:function(t){this.show_form_new_event=t,this.onReset()},showUpdateEvent:function(t){this.show_form_update_event=t,this.onResetUpdate()},showDeleteArtist:function(t){this.show_form_delete_artist=t,this.onResetDeleteArtist()},showAddArtist:function(t){this.show_form_add_artist=t,this.onResetAddArtistInEvent()},submitAddEvent:function(){var t=this,e={name:this.newEventForm.name,place:this.newEventForm.place,city:this.newEventForm.city,date:this.newEventForm.date,price:this.newEventForm.price,total_available_tickets:this.newEventForm.tickets};c.a.post("https://a2-eventright.herokuapp.com/event",e,{auth:{username:this.token}}).then(function(){console.log("Event added"),t.getEvents(),t.showAddNewEvent(!1)}).catch(function(t){console.log(t)})},submitAddArtist:function(t){this.addNewArtist()},submitDeleteArtist:function(){var t=this,e="https://a2-eventright.herokuapp.com/event/";e=e.concat(this.event_to_modify.event.id,"/artists"),c.a.get(e,{auth:{username:this.token}}).then(function(e){console.log(e.data.artists);for(var i=e.data.artists,n=0;n<i.length;n+=1)console.log(i[n].artist),t.form_delete_artist.name==i[n].artist.name&&t.deleteArtist(i[n].artist.id);t.getEvents()}).catch(function(t){console.log(t)})},deleteArtist:function(t){var e=this,i="https://a2-eventright.herokuapp.com/event/";i=i.concat(this.event_to_modify.event.id,"/artist/",t),c.a.delete(i,{auth:{username:this.token}}).then(function(){console.log("Artist deleted"),e.getEvents(),e.showDeleteArtist(!1)}).catch(function(t){console.log(t)})},submitUpdate:function(){var t=this,e={id:this.editEventForm.id,name:this.editEventForm.name,price:this.editEventForm.price,date:this.editEventForm.date,city:this.editEventForm.city,place:this.editEventForm.place,total_available_tickets:this.editEventForm.tickets};c.a.put("https://a2-eventright.herokuapp.com/event",e,{auth:{username:this.token}}).then(function(){console.log("Event updated"),t.getEvents(),t.showUpdateEvent(!1)}).catch(function(t){console.log(t)})},onResetUpdate:function(){this.editEventForm.id="",this.editEventForm.name="",this.editEventForm.price=0,this.editEventForm.date="",this.editEventForm.country="",this.editEventForm.city="",this.editEventForm.place="",this.editEventForm.tickets=0},onResetDeleteArtist:function(){this.form_delete_artist.id="",this.form_delete_artist.name=""},onResetAddArtistInEvent:function(){this.addArtistForm.id="",this.addArtistForm.name="",this.addArtistForm.country="",this.addArtistForm.genre=""},onReset:function(){this.newEventForm.name="",this.newEventForm.price=0,this.newEventForm.date="",this.newEventForm.country="",this.newEventForm.city="",this.newEventForm.place="",this.newEventForm.tickets=0},showAddArtistForm:function(t){this.eventWhereModifyArtist(t),this.showAddArtist(!0)},showDeleteArtistForm:function(t){this.eventWhereModifyArtist(t),this.showDeleteArtist(!0)},eventWhereModifyArtist:function(t){this.event_to_modify=t},addNewArtist:function(){var t=this,e={name:this.addArtistForm.name,country:this.addArtistForm.country,genre:this.addArtistForm.genre};c.a.post("https://a2-eventright.herokuapp.com/artist",e,{auth:{username:this.token}}).then(function(e){console.log(e.data.id_artist),t.addArtistInEvent(e.data.id_artist)}).catch(function(t){console.log(t)})},addArtistInEvent:function(t){var e="https://a2-eventright.herokuapp.com/event/".concat(this.event_to_modify.event.id,"/artist"),i={idArtist:t};console.log(t),c.a.post(e,i,{auth:{username:this.token}}).then(function(){console.log("Artist added to event")}).catch(function(t){console.log(t)})}}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("img",{staticClass:"img-fluid",staticStyle:{width:"100%",height:"459px"},attrs:{src:"/static/portada2.jpg",alt:"Responsive image"}}),t._v(" "),i("h1",[t._v(" "+t._s(t.message)+" ")]),t._v(" "),t.is_admin?i("div",[i("button",{staticClass:"btn btn-success btn-lg",on:{click:function(e){return t.showAddNewEvent(!0)}}},[t._v(" Add New Event ")]),t._v(" "),i("button",{staticClass:"btn btn-success btn-lg",on:{click:function(e){return t.showUpdateEvent(!0)}}},[t._v(" Update Event ")])]):t._e(),t._v(" "),t.show_form_new_event?i("div",[i("h3",[t._v("Add New Event")]),t._v(" "),i("button",{staticClass:"btn btn-lg btn-blue-cross fixed",staticStyle:{float:"right"},attrs:{type:"submit"},on:{click:function(e){return t.showAddNewEvent(!1)}}},[t._v("X")]),t._v(" "),i("b-form",[i("b-form-group",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-group-1",label:"Name:","label-for":"input-1"}},[i("b-form-input",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-1",type:"text",required:"",placeholder:"Enter event name"},model:{value:t.newEventForm.name,callback:function(e){t.$set(t.newEventForm,"name",e)},expression:"newEventForm.name"}})],1),t._v(" "),i("b-form-group",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-group-2",label:"Price:","label-for":"input-2"}},[i("b-form-input",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-2",type:"number",required:"",placeholder:"Enter price"},model:{value:t.newEventForm.price,callback:function(e){t.$set(t.newEventForm,"price",e)},expression:"newEventForm.price"}})],1),t._v(" "),i("b-form-group",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-group-3",label:"Date:","label-for":"input-3"}},[i("b-form-input",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-3",type:"text",required:"",placeholder:"Enter date"},model:{value:t.newEventForm.date,callback:function(e){t.$set(t.newEventForm,"date",e)},expression:"newEventForm.date"}})],1),t._v(" "),i("b-form-group",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-group-4",label:"City:","label-for":"input-4"}},[i("b-form-input",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-4",type:"text",required:"",placeholder:"Enter city"},model:{value:t.newEventForm.city,callback:function(e){t.$set(t.newEventForm,"city",e)},expression:"newEventForm.city"}})],1),t._v(" "),i("b-form-group",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-group-5",label:"Place:","label-for":"input-5"}},[i("b-form-input",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-5",type:"text",required:"",placeholder:"Enter place"},model:{value:t.newEventForm.place,callback:function(e){t.$set(t.newEventForm,"place",e)},expression:"newEventForm.place"}})],1),t._v(" "),i("b-form-group",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-group-6",label:"Tickets:","label-for":"input-6"}},[i("b-form-input",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-6",type:"number",required:"",placeholder:"Enter tickets"},model:{value:t.newEventForm.tickets,callback:function(e){t.$set(t.newEventForm,"tickets",e)},expression:"newEventForm.tickets"}})],1),t._v(" "),i("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(e){return t.submitAddEvent()}}},[t._v("Submit")]),t._v(" "),i("button",{staticClass:"btn btn-danger",staticStyle:{width:"auto"},attrs:{type:"button"},on:{click:function(e){return t.onReset()}}},[t._v("Reset")])],1)],1):t._e(),t._v(" "),t.show_form_update_event?i("div",[i("h3",[t._v("UPDATE EVENT")]),t._v(" "),i("button",{staticClass:"btn btn-lg btn-blue-cross fixed",staticStyle:{float:"right"},attrs:{type:"submit"},on:{click:function(e){return t.showUpdateEvent(!1)}}},[t._v("X")]),t._v(" "),i("b-form",[i("b-form-group",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-group-0",label:"Id:","label-for":"input-0"}},[i("b-form-input",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-0",type:"text",required:"",placeholder:"Enter id"},model:{value:t.editEventForm.id,callback:function(e){t.$set(t.editEventForm,"id",e)},expression:"editEventForm.id"}})],1),t._v(" "),i("b-form-group",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-group-1",label:"Name:","label-for":"input-1"}},[i("b-form-input",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-1",type:"text",required:"",placeholder:"Enter event name"},model:{value:t.editEventForm.name,callback:function(e){t.$set(t.editEventForm,"name",e)},expression:"editEventForm.name"}})],1),t._v(" "),i("b-form-group",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-group-2",label:"Price:","label-for":"input-2"}},[i("b-form-input",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-2",type:"number",required:"",placeholder:"Enter price"},model:{value:t.editEventForm.price,callback:function(e){t.$set(t.editEventForm,"price",e)},expression:"editEventForm.price"}})],1),t._v(" "),i("b-form-group",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-group-3",label:"Date:","label-for":"input-3"}},[i("b-form-input",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-3",type:"text",required:"",placeholder:"Enter date"},model:{value:t.editEventForm.date,callback:function(e){t.$set(t.editEventForm,"date",e)},expression:"editEventForm.date"}})],1),t._v(" "),i("b-form-group",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-group-4",label:"City:","label-for":"input-4"}},[i("b-form-input",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-4",type:"text",required:"",placeholder:"Enter city"},model:{value:t.editEventForm.city,callback:function(e){t.$set(t.editEventForm,"city",e)},expression:"editEventForm.city"}})],1),t._v(" "),i("b-form-group",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-group-5",label:"Place:","label-for":"input-5"}},[i("b-form-input",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-5",type:"text",required:"",placeholder:"Enter place"},model:{value:t.editEventForm.place,callback:function(e){t.$set(t.editEventForm,"place",e)},expression:"editEventForm.place"}})],1),t._v(" "),i("b-form-group",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-group-6",label:"Tickets:","label-for":"input-6"}},[i("b-form-input",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-6",type:"number",required:"",placeholder:"Enter tickets"},model:{value:t.editEventForm.tickets,callback:function(e){t.$set(t.editEventForm,"tickets",e)},expression:"editEventForm.tickets"}})],1),t._v(" "),i("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(e){return t.submitUpdate()}}},[t._v("Submit")]),t._v(" "),i("button",{staticClass:"btn btn-danger",staticStyle:{width:"auto"},attrs:{type:"button"},on:{click:function(e){return t.onResetUpdate()}}},[t._v("Reset")])],1)],1):t._e(),t._v(" "),t.show_form_add_artist?i("div",[i("h3",[t._v("Add artist")]),t._v(" "),i("button",{staticClass:"btn btn-lg btn-blue-cross fixed",staticStyle:{float:"right"},attrs:{type:"submit"},on:{click:function(e){return t.showAddArtist(!1)}}},[t._v("X")]),t._v(" "),i("b-form",[i("b-form-group",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-group-1",label:"Id artist:","label-for":"input-1"}},[i("b-form-input",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-1",type:"text",required:"",placeholder:"Enter artist id"},model:{value:t.addArtistForm.id,callback:function(e){t.$set(t.addArtistForm,"id",e)},expression:"addArtistForm.id"}})],1),t._v(" "),i("b-form-group",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-group-1",label:"Name artist:","label-for":"input-1"}},[i("b-form-input",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-1",type:"text",required:"",placeholder:"Enter artist name"},model:{value:t.addArtistForm.name,callback:function(e){t.$set(t.addArtistForm,"name",e)},expression:"addArtistForm.name"}})],1),t._v(" "),i("b-form-group",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-group-2",label:"Country artist:","label-for":"input-2"}},[i("b-form-input",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-2",type:"text",required:"",placeholder:"Enter country artist"},model:{value:t.addArtistForm.country,callback:function(e){t.$set(t.addArtistForm,"country",e)},expression:"addArtistForm.country"}})],1),t._v(" "),i("b-form-group",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-group-3",label:"Genre:","label-for":"input-3"}},[i("b-form-input",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-3",type:"text",required:"",placeholder:"Enter date"},model:{value:t.addArtistForm.genre,callback:function(e){t.$set(t.addArtistForm,"genre",e)},expression:"addArtistForm.genre"}})],1),t._v(" "),i("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(e){return t.submitAddArtist()}}},[t._v("Submit")]),t._v(" "),i("button",{staticClass:"btn btn-danger",staticStyle:{width:"auto"},attrs:{type:"button"},on:{click:function(e){return t.onResetAddArtistInEvent()}}},[t._v("Reset")])],1)],1):t._e(),t._v(" "),t.show_form_delete_artist?i("div",[i("h3",[t._v("DELETE ARTIST")]),t._v(" "),i("button",{staticClass:"btn btn-lg btn-blue-cross fixed",staticStyle:{float:"right"},attrs:{type:"submit"},on:{click:function(e){return t.showDeleteArtist(!1)}}},[t._v("X")]),t._v(" "),i("b-form",[i("b-form-group",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-group-1",label:"Name:","label-for":"input-1"}},[i("b-form-input",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-1",type:"text",required:"",placeholder:"Enter artist name"},model:{value:t.form_delete_artist.name,callback:function(e){t.$set(t.form_delete_artist,"name",e)},expression:"form_delete_artist.name"}})],1),t._v(" "),i("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(e){return t.submitDeleteArtist()}}},[t._v("Submit")]),t._v(" "),i("button",{staticClass:"btn btn-danger",staticStyle:{width:"auto"},attrs:{type:"button"},on:{click:function(e){return t.onResetDeleteArtist()}}},[t._v("Reset")])],1)],1):t._e(),t._v(" "),t.form_new_event?t._e():i("div",[t.is_admin?t._e():i("button",{staticClass:"btn btn-success btn-lg",attrs:{disabled:t.show},on:{click:function(e){return t.showCartView(!0)}}},[t._v("View Cart ")]),t._v(" "),i("h4",[t._v(" Total tickets bought: "+t._s(t.tickets_bought)+" ")]),t._v(" "),i("h4",[t._v(" Money available: "+t._s(t.money_available)+" ")]),t._v(" "),t.show?t._e():i("div",{staticClass:"container",attrs:{id:"eventsView"}},[i("div",{staticClass:"row"},t._l(t.events,function(e){return i("div",{key:e.id,staticClass:"col-lg-4 col-md-6 mb-4",staticStyle:{width:"75%","margin-left":"auto","margin-right":"auto"}},[i("br"),t._v(" "),i("div",{staticClass:"card",staticStyle:{width:"18rem"}},[i("img",{staticClass:"card-img-top",staticStyle:{height:"150px"},attrs:{src:t.loadImage(e),alt:"Card image cap",id:"card_img"}}),t._v(" "),i("div",{staticClass:"card-body"},[i("h5",{staticClass:"card-title"},[t._v(t._s(e.event.name))]),t._v(" "),i("p",{staticClass:"card-text"}),t._l(e.artists,function(e){return i("div",{key:e.id},[i("h5",[t._v(t._s(e.name))])])}),t._v(" "),i("h6",[t._v(t._s(e.event.city))]),t._v(" "),i("h6",[t._v(t._s(e.event.place))]),t._v(" "),i("h6",[t._v(t._s(e.event.date))]),t._v(" "),i("h6",[t._v(t._s(e.event.price)+" €")]),t._v(" "),i("p")],2),t._v(" "),i("div",{staticClass:"container",staticStyle:{"background-color":"#90caf9"}},[i("h6",[t._v("Tickets disponibles: "+t._s(e.event.total_available_tickets))]),t._v(" "),t.is_admin?t._e():i("button",{staticClass:"btn btn-success btn-lg",attrs:{disabled:t.isEventInCart(e)},on:{click:function(i){return t.addToCart(e)}}},[t._v(" Add to cart ")]),t._v(" "),t.is_admin?i("button",{staticClass:"btn btn-dark",attrs:{type:"button"},on:{click:function(i){return t.showAddArtistForm(e)}}},[t._v("Add Artist to Event")]):t._e(),t._v(" "),t.is_admin?i("button",{staticClass:"btn btn-dark",attrs:{type:"button"},on:{click:function(i){return t.showDeleteArtistForm(e)}}},[t._v("Delete Artist in Event")]):t._e()])])])}),0)]),t._v(" "),t.show?i("div",{staticClass:"container",attrs:{id:"cartView"}},[i("h3",[t._v(" Cart ")]),t._v(" "),i("table",{staticStyle:{width:"75%","margin-left":"auto","margin-right":"auto"},attrs:{id:"tab"}},[t._m(0),t._v(" "),t._l(this.events_added,function(e,n){return i("tbody",[i("tr",[i("td",[t._v(t._s(e.event.name))]),t._v(" "),i("td",[i("h5",[t._v(" "+t._s(t.quantity_events_added[e.event.name])+"\n            "),i("button",{staticClass:"btn btn-success",staticStyle:{width:"auto%"},attrs:{type:"button"},on:{click:function(i){return t.addTicket(e)}}},[t._v("+")]),t._v(" "),i("button",{staticClass:"btn btn-danger",staticStyle:{width:"auto%"},attrs:{type:"button"},on:{click:function(i){return t.substractTicket(e)}}},[t._v("-")])])]),t._v(" "),i("td",[t._v(t._s(e.event.price))]),t._v(" "),i("td",[t._v(t._s(e.event.price*t.quantity_events_added[e.event.name]))]),t._v(" "),i("td",[i("button",{staticClass:"btn btn-danger",staticStyle:{width:"auto"},attrs:{type:"button"},on:{click:function(i){return t.deleteTicket(e)}}},[t._v("Delete ticket")])])])])})],2),t._v(" "),i("button",{staticClass:"btn btn-secondary",attrs:{type:"button"},on:{click:t.back}},[t._v("Back")]),t._v(" "),i("button",{staticClass:"btn btn-success",attrs:{type:"button",disabled:t.empty_cart},on:{click:t.finalizePurchase}},[t._v("Finalize purchase")])]):t._e()])])},staticRenderFns:[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("thead",[i("tr",[i("th",[t._v("Event Name")]),t._v(" "),i("th",[t._v("Quantity")]),t._v(" "),i("th",[t._v("Price(€)")]),t._v(" "),i("th",[t._v("Total")]),t._v(" "),i("th")])])}]},m=i("VU/8")(d,l,!1,null,null,null).exports,h={data:function(){return{username:"",password:"",is_admin:0,show:!1,addUserForm:{username:"",password:""},accounts:{},money_available:0}},created:function(){},methods:{getAccount:function(){var t=this,e="https://a2-eventright.herokuapp.com/account/";e=e.concat(this.username),c.a.get(e).then(function(e){t.is_admin=e.data.accounts.is_admin,t.money_available=e.data.accounts.available_money,alert("Successful logged"),t.$router.replace({path:"/userlogin",query:{username:t.username,logged:t.logged,token:t.token,money_available:t.money_available,is_admin:t.is_admin}})}).catch(function(t){console.error(t)})},initForm:function(){this.addUserForm.username="",this.addUserForm.password=""},submit:function(){var t=this,e={username:this.addUserForm.username,password:this.addUserForm.password};c.a.post("https://a2-eventright.herokuapp.com/account",e).then(function(e){console.log("User created"),alert("User created"),t.showSignIn(!1)}).catch(function(t){console.error(t),alert("User already exist")})},showSignIn:function(t){this.show=t},backToEvents:function(){this.$router.replace({path:"/userlogin",query:{username:this.username,logged:this.logged}})},createAccount:function(){this.show=!0},checkLogin:function(){var t=this,e={username:this.username,password:this.password};c.a.post("https://a2-eventright.herokuapp.com/login",e).then(function(e){t.logged=!0,t.token=e.data.token,t.find_match=!0,t.getAccount()}).catch(function(e){console.error(e),t.user="",alert("Username or Password incorrect")})},emptyFields:function(){return""==this.addUserForm.username&&""==this.addUserForm.username}}},p={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[t.show?t._e():i("div",{staticClass:"container"},[i("h3",[t._v("Sign in")]),t._v(" "),i("div",{staticClass:"form-label-group"},[i("label",{attrs:{for:"inputEmail"}},[t._v("Username")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"form-control",staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{type:"username",id:"inputUsername",placeholder:"Username",required:"",autofocus:""},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}})]),t._v(" "),i("div",{staticClass:"form-label-group"},[i("br"),t._v(" "),i("label",{attrs:{for:"inputPassword"}},[t._v("Password")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control",staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{type:"password",id:"inputPassword",placeholder:"Password",required:""},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),t._v(" "),i("div",{staticClass:"btn-group-vertical"},[i("button",{staticClass:"btn btn-primary",staticStyle:{width:"300px"},attrs:{type:"button"},on:{click:function(e){return t.checkLogin()}}},[t._v("SIGN IN")]),t._v(" "),i("button",{staticClass:"btn btn-success",staticStyle:{width:"300px"},attrs:{type:"button"},on:{click:function(e){return t.createAccount()}}},[t._v("CREATE ACCOUNT")]),t._v(" "),i("button",{staticClass:"btn btn-secondary",staticStyle:{width:"300px"},attrs:{type:"button"},on:{click:function(e){return t.backToEvents()}}},[t._v("BACK TO EVENTS")])])]),t._v(" "),t.show?i("div",[i("h3",[t._v("Create account")]),t._v(" "),i("button",{staticClass:"btn btn-lg btn-blue-cross fixed",staticStyle:{float:"right"},attrs:{type:"submit"},on:{click:function(e){return t.showSignIn(!1)}}},[t._v("X")]),t._v(" "),i("b-form",[i("b-form-group",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-group-1",label:"Username:","label-for":"input-1"}},[i("b-form-input",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-1",type:"text",required:"",placeholder:"Enter username"},model:{value:t.addUserForm.username,callback:function(e){t.$set(t.addUserForm,"username",e)},expression:"addUserForm.username"}})],1),t._v(" "),i("b-form-group",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-group-2",label:"Password:","label-for":"input-2"}},[i("b-form-input",{staticStyle:{width:"300px","margin-left":"auto","margin-right":"auto"},attrs:{id:"input-2",type:"password",required:"",placeholder:"Enter password"},model:{value:t.addUserForm.password,callback:function(e){t.$set(t.addUserForm,"password",e)},expression:"addUserForm.password"}})],1),t._v(" "),i("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(e){return t.submit()}}},[t._v("Submit")]),t._v(" "),i("button",{staticClass:"btn btn-danger",staticStyle:{width:"auto"},attrs:{type:"button"},on:{click:function(e){return t.initForm()}}},[t._v("Reset")])],1)],1):t._e()])},staticRenderFns:[]},v=i("VU/8")(h,p,!1,null,null,null).exports;a.default.use(o.a);var _=new o.a({mode:"history",base:Object({NODE_ENV:"production"}).BASE_URL,routes:[{path:"/",name:"Login",component:v},{path:"/userlogin",name:"Events",component:m}]});a.default.use(n.a),a.default.config.productionTip=!1,new a.default({el:"#app",router:_,components:{App:s},template:"<App/>"})},sWs5:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.383274364949ab2064b8.js.map