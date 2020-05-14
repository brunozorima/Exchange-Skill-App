<template>
  <div class="page__content--membersarea">
    <div class="container">
      <div class="row">
          <div class="col-xs-12">
              <h1 class="heading heading--level2 primary-color">DASHBOARD AREA</h1>
          </div>
              <ul class="col-xs-12 tabs-mobile">
                    <li id="menu-dashboard" role="presentation" class="tabs-mobile__item tabs-mobile__item--active">
                        <a class="tabs-mobile__link" v-on:click="currentTabComponent = 'UserDetails'">PROFILE</a>
                    </li>
                    <li id="menu-profile" role="presentation" class="tabs-mobile__item">
                        <a class="tabs-mobile__link" v-on:click="currentTabComponent = 'userSkills'">SKILLS</a>
                    </li>
                    <li id="menu-bookaclass" role="presentation" class="tabs-mobile__item">
                        <a class="tabs-mobile__link" v-on:click="currentTabComponent = 'ListOfSkills'">ADD SKILL</a>
                    </li>
                    <li id="menu-courses" role="presentation" class="tabs-mobile__item">
                        <a class="tabs-mobile__link"  v-on:click="currentTabComponent = 'AllExchanges'">EXCHANGES</a>
                    </li>
                    <li id="menu-activity" role="presentation" class="tabs-mobile__item">
                        <a class="tabs-mobile__link"  v-on:click="currentTabComponent = 'PendingExchanges'">NOTIFICATIONS</a>
                    </li>
                    <li id="menu-benefits" role="presentation" class="tabs-mobile__item">
                        <a class="tabs-mobile__link"  v-on:click="currentTabComponent = 'UserSetting'">SETTINGS</a>
                    </li>
              </ul>
          </div>
      </div> 
      <div class="page__content">
        <div class="container">
          <div class="row">
             <div class="col-xs-12">
               <keep-alive>
                <component v-bind:is="currentTabComponent"></component>
              </keep-alive>
             </div>
          </div>
        </div>
      </div>
  </div>  
</template>

<script>
import UserDetails from '../components/UserDetails';
import userSkills from '../components/SkillComponent/skillPage';
import ListOfSkills from '../components/ListOfSkills';
import AllExchanges from '../components/ExchangeComponents/AllExchanges';
import PendingExchanges from '../components/ExchangeComponents/PendingExchanges';
import UserSetting from '../components/UserSetting';

export default {
 components: {
      UserDetails,
      userSkills,
      ListOfSkills,
      AllExchanges,
      PendingExchanges,
      UserSetting
    },
  data() {
    return {
      currentTabComponent: 'UserDetails'
    }
  }
}
</script>

<style scoped>
.page__content--membersarea {
  background-color:slategrey;
  padding: 20px 0 0 0;
}
.page__content {
  /* where content begins within page__main, currently only used to give some space for content to breathe */
  padding: 20px 0 20px 0;
  position: relative;
  background-color: #FFFFFF
}
.heading {
  display: block;
  font-family: "URWDINCond-Black", Helvetica, Arial, sans-serif;
  font-size: 3.8rem;
  margin-top: 0;
  margin-bottom: 20px;
  color: #00999D;
  line-height: 0.9;
  text-transform: uppercase;
  font-style: italic;
  font-weight: 400;
}
.heading--flex {
  display: flex;
  align-items: center;
}
.heading--level2 {
  font-size: 2.8rem;
  line-height: 0.9;
  color: #00999D;
  margin-bottom: 20px;
}
.static-html--primary-color p {
  color: #FFFFFF;
}
.primary-color {
  color: #212121;
}
.primary-color {
  color: #FFFFFF;
  fill: #FFFFFF;
}
.tabs-mobile {
  margin: 0;
  list-style-type: none;
  background-color: transparent;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  max-width: 100%;
  padding: 0;
}
@media (min-width: 768px) {
  .tabs-mobile--absolute {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
.tabs-mobile__item {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #E0E0E0;
  transition: background-color 0.2s linear, border 0.2s linear;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: auto;
  border-left: 1px solid #bababa;
  border-bottom: 1px solid #bababa;
  border-right: 1px solid #E0E0E0;
  border-top: 1px solid #E0E0E0;
  box-shadow: 0 0 0 0;
  margin-bottom: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.tabs-mobile__item:before {
  content: "";
}
.tabs-mobile__item:hover, .tabs-mobile__item:active {
  background-color: #FFB13D;
  border: 1px solid #FFB13D;
}
.tabs-mobile__item--active {
  background-color: #FFFFFF;
  border: 1px solid #FFFFFF;
  box-shadow: 0 0 0 0;
}
.tabs-mobile__item--active:link, .tabs-mobile__item--active:visited {
  background-color: #FFFFFF;
  border: 1px solid #FFFFFF;
}
.tabs-mobile__item--active:hover, .tabs-mobile__item--active:active {
  background-color: #FFFFFF;
  border: 1px solid #FFFFFF;
}
@media (min-width: 768px) {
  .tabs-mobile__item--active {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: auto;
    border: 1px solid #FFFFFF;
  }
}
.tabs-mobile__item--large {
  flex-grow: 1.5;
}
.tabs-mobile__link {
  cursor: pointer;
  display: block;
  font-size: 1.3rem;
  font-weight: 700;
  text-decoration: none;
  margin: 0;
  width: 100%;
  padding: 15px 0;
  text-align: center;
  color: #212121;
  transition: all 0.2s linear;
}
.tabs-mobile__link:hover, .tabs-mobile__link:active {
  color: #212121;
}
.tabs-mobile__link:focus {
  outline: none;
  background-color: #FFB13D;
}
.tabs-mobile__link--active {
  color: #00999D;
}
.tabs-mobile__link--active:hover, .tabs-mobile__link--active:active {
  color: #00999D;
}
.col-xs-12 {
  float:left;
}
.col-xs-12 {
    width: 100%;
}
</style>