<template>
  <div class="footer">
    <div class="inner-footer">
      <div class="footer-items">
        <h3 class="footer-h3">Your Account</h3>
        <div class="border1"></div>

        <ul>
          <router-link to="/register">
            <li>Sign up</li>
          </router-link>
          <router-link to="/login">
            <li>Log in</li>
          </router-link>
          <a href="#">
            <li>Help</li>
          </a>
        </ul>
      </div>

      <div class="footer-items">
        <h3 class="footer-h3">Discover</h3>
        <div class="border1"></div>

        <ul>
          <a href="#">
            <li>Groups</li>
          </a>
          <a href="#">
            <li>Calendar</li>
          </a>
          <a href="#">
            <li>Topics</li>
          </a>
          <a href="#">
            <li>Cities</li>
          </a>
        </ul>
      </div>

      <div class="footer-items">
        <h3 class="footer-h3">Meetup</h3>
        <div class="border1"></div>
        <ul>
          <a href="#">
            <li>About</li>
          </a>
          <a href="#">
            <li>Meetup Pro</li>
          </a>
          <a href="#">
            <li>Careers</li>
          </a>
          <a href="#">
            <li>Apps</li>
          </a>
          <a href="#">
            <li>Blogs</li>
          </a>
          <a href="#">
            <li>Accessibility</li>
          </a>
        </ul>

        <div class="social-media">
          <h3 class="footer-h3">Follow Us</h3>
          <a href="#">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="#">
            <i class="fab fa-facebook"></i>
          </a>
          <a href="#">
            <i class="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">Copyright &copy; 2020 Meetup LLC.</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* FOOTER */
.footer {
  width: 100%;
  background: rgb(255, 17, 84);
  display: block;
}

.footer-h3 {
  font-weight: 500;
  font-family: Graphik Meetup, -apple-system, BlinkMacSystemFont, Roboto,
    Helvetica, Arial, sans-serif;
}

.inner-footer {
  width: 95%;
  margin: auto;
  padding: 30px 10px;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: center;
}

.footer-items {
  width: 25%;
  padding: 10px 20px;
  box-sizing: border-box;
  color: #fff;
}

.footer-items p {
  font-size: 16px;
  text-align: justify;
  line-height: 25px;
  color: #fff;
}

.footer-items h1 {
  color: #fff;
}

.border1 {
  height: 3px;
  width: 40px;
  background: #fff;
  color: #fff;
  background-color: #fff;
  border: 0px;
}

ul {
  list-style: none;

  font-size: 16px;
  letter-spacing: 0.5px;
  font-weight: 500;
  font-family: Graphik Meetup, -apple-system, BlinkMacSystemFont, Roboto,
    Helvetica, Arial, sans-serif;
}

ul a {
  text-decoration: none;
  outline: none;
  color: rgb(255, 255, 255, 0.7);
  transition: 0.3s;
}

ul a:hover {
  color: #fff;
}

ul li {
  margin: 10px 0;
  height: 25px;
}

li i {
  margin-right: 20px;
}

.social-media {
  width: 100%;
  color: #fff;
  text-align: center;
  font-size: 20px;
}

.social-media a {
  text-decoration: none;
}

.social-media i {
  height: 25px;
  width: 25px;
  margin: 20px 10px;
  padding: 4px;
  color: #fff;
  transition: 0.5s;
}

.social-media i:hover {
  transform: scale(1.5);
}

.footer-bottom {
  padding: 10px;
  background: rgb(255, 17, 84);
  color: #fff;
  font-size: 14px;
  text-align: center;
  font-family: Graphik Meetup, -apple-system, BlinkMacSystemFont, Roboto,
    Helvetica, Arial, sans-serif;
}

/* for tablet mode view */

@media screen and (max-width: 1275px) {
  .footer-items {
    width: 50%;
  }
}

/* for mobile screen view */

@media screen and (max-width: 660px) {
  .footer-items {
    width: 100%;
  }
}
</style>
