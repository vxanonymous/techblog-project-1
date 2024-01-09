<template>
  <div>
    <footer class="footer-10">
      <div class="container">
        <div class="row mb-3 pb-3 no-gutters">
          <div class="col-md-4 mb-md-0 mb-4 d-flex">
            <div class="con con-1 w-100 py-5">
              <div class="con-info w-100 text-center">
                <div
                  class="icon d-flex align-items-center justify-content-center"
                >
                  <span class="ion-ios-call"></span>
                </div>
                <div class="text">
                  <span>(+84) 0867 684 018</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-md-0 mb-4 d-flex">
            <div class="con con-2 w-100 py-5">
              <div class="con-info w-100 text-center">
                <div
                  class="icon d-flex align-items-center justify-content-center"
                >
                  <span class="ion-ios-mail"></span>
                </div>
                <div class="text">
                  <span>tech-blogs@email.com</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-md-0 mb-4 d-flex">
            <div class="con con-3 w-100 py-5">
              <div class="con-info w-100 text-center">
                <div
                  class="icon d-flex align-items-center justify-content-center"
                >
                  <span class="ion-ios-pin"></span>
                </div>
                <div class="text">
                  <span
                    >Ha Noi, Viet Nam</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-7">
            <div class="row">
              <div class="col-md-4 mb-md-0 mb-4">
                <h2 class="footer-heading">About</h2>
                <ul class="list-unstyled">
                  <li><a href="#" class="d-block">Out story</a></li>
                  <li><a href="#" class="d-block">Awards</a></li>
                  <li><a href="#" class="d-block">Our Team</a></li>
                  <li><a href="#" class="d-block">Career</a></li>
                </ul>
              </div>
              <!-- <div class="col-md-4 mb-md-0 mb-4">
                <h2 class="footer-heading">Company</h2>
                <ul class="list-unstyled">
                  <li><a href="#" class="d-block">Our services</a></li>
                  <li><a href="#" class="d-block">Clients</a></li>
                  <li><a href="#" class="d-block">Contact</a></li>
                  <li><a href="#" class="d-block">Press</a></li>
                </ul>
              </div>
              <div class="col-md-4 mb-md-0 mb-4">
                <h2 class="footer-heading">Resources</h2>
                <ul class="list-unstyled">
                  <li><a href="#" class="d-block">Blog</a></li>
                  <li><a href="#" class="d-block">Newsletter</a></li>
                  <li><a href="#" class="d-block">Privacy Policy</a></li>
                </ul>
              </div> -->
            </div>
          </div>
          <div class="col-md-5 mb-md-0 mb-4">
            <h2 class="footer-heading">Subscribe</h2>
            <form action="#" class="subscribe-form">
              <div class="form-group d-flex">
                <input
                  type="text"
                  class="form-control rounded-left"
                  placeholder="Enter email address"
                />
                <button type="submit" class="form-control submit rounded-right">
                  Subscribe
                </button>
              </div>
              <span class="subheading"
                >Get digital marketing updates in your mailbox</span
              >
            </form>
          </div>
        </div>
        <div class="row mt-3 pt-4 border-top">
          <div class="col-md-6 col-lg-8 mb-md-0 mb-2">
            <p class="copyright mb-0">
              Copyright {{year}} All rights reserved.
            </p>
          </div>
          <div class="col-md-6 col-lg-4 text-md-right">
            <ul class="ftco-footer-social p-0">
              <li class="ftco-animate">
                <a
                  href="#"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Twitter"
                  ><span class="ion-logo-twitter"></span
                ></a>
              </li>
              <li class="ftco-animate">
                <a
                  href="#"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Facebook"
                  ><span class="ion-logo-facebook"></span
                ></a>
              </li>
              <li class="ftco-animate">
                <a
                  href="#"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Instagram"
                  ><span class="ion-logo-instagram"></span
                ></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
    data() {
        return {
            year: new Date().getFullYear()
        }
    }
};
</script>

<style>
@import url('../assets/css/ionicons.min.css');
@import url('../assets/css/style.css');
</style>