<template>
  <div id="wrapper">
    <!-- Header
================================================== -->
     <headerLayout />
    <!-- Banner
================================================== -->
    <findLayout />

    <!-- Content
================================================== -->

    <!-- Categories -->
    <catagoryLayout />

    <div class="container">
      <!-- Recent Jobs -->
     <recentjobsLayout />

      <!-- Job Spotlight -->
      <jobspotlightLayout />

    </div>

    <section class="fullwidth-testimonial margin-top-15">
      <!-- Info Section -->
      <div class="container">
        <div class="sixteen columns">
          <h3 class="headline centered">
            What Our Users Say 😍
            <span class="margin-top-25"
              >We collect reviews from our users so you can get an honest
              opinion of what an experience with our website are really
              like!</span
            >
          </h3>
        </div>
      </div>
      <!-- Info Section / End -->

      <!-- Testimonials Carousel -->
      <div class="fullwidth-carousel-container margin-top-20">
        <div class="testimonial-carousel testimonials">
          <!-- Item -->
          <div class="fw-carousel-review">
            <div class="testimonial-box">
              <div class="testimonial">
                Capitalize on low hanging fruit to identify a ballpark value
                added activity to beta test. Override the digital divide with
                additional clickthroughs from DevOps. Nanotechnology immersion
                along the information highway will close.
              </div>
            </div>
            <div class="testimonial-author">
              <img src="images/resumes-list-avatar-03.png" alt="" />
              <h4>Tom Baker <span>HR Specialist</span></h4>
            </div>
          </div>

          <!-- Item -->
          <div class="fw-carousel-review">
            <div class="testimonial-box">
              <div class="testimonial">
                Bring to the table win-win survival strategies to ensure
                proactive domination. At the end of the day, going forward, a
                new normal that has evolved from generation is on the runway
                heading towards a streamlined cloud content.
              </div>
            </div>
            <div class="testimonial-author">
              <img src="images/resumes-list-avatar-02.png" alt="" />
              <h4>Jennie Smith <span>Jobseeker</span></h4>
            </div>
          </div>

          <!-- Item -->
          <div class="fw-carousel-review">
            <div class="testimonial-box">
              <div class="testimonial">
                Leverage agile frameworks to provide a robust synopsis for high
                level overviews. Iterative approaches to corporate strategy
                foster collaborative thinking to further the overall value
                proposition. Organically grow the holistic world view.
              </div>
            </div>
            <div class="testimonial-author">
              <img src="images/resumes-list-avatar-01.png" alt="" />
              <h4>Jack Paden <span>Jobseeker</span></h4>
            </div>
          </div>
        </div>
      </div>
      <!-- Testimonials Carousel / End -->
    </section>

    <!-- Flip banner -->
    <a
      href="browse-jobs.html"
      class="flip-banner margin-bottom-55"
      data-background="images/all-categories-photo.jpg"
      data-color="#26ae61"
      data-color-opacity="0.93"
    >
      <div class="flip-banner-content">
        <h2 class="flip-visible">Step inside and see for yourself!</h2>
        <h2 class="flip-hidden">
          Get Started <i class="fa fa-angle-right"></i>
        </h2>
      </div>
    </a>
    <!-- Flip banner / End -->

    <!-- Recent Posts -->
    <div class="container">
      <div class="sixteen columns">
        <h3 class="margin-bottom-25">Recent Posts</h3>
      </div>

      <div class="one-third column">
        <!-- Post #1 -->
        <div class="recent-post">
          <div class="recent-post-img">
            <a href="blog-single-post.html"
              ><img src="images/recent-post-01.jpg" alt=""
            /></a>
            <div class="hover-icon"></div>
          </div>
          <a href="blog-single-post.html">
            <h4>Hey Job Seeker, It’s Time To Get Up And Get Hired</h4>
          </a>
          <div class="meta-tags">
            <span>October 10, 2015</span>
            <span><a href="#">0 Comments</a></span>
          </div>
          <p>
            The world of job seeking can be all consuming. From secretly
            stalking the open reqs page of your dream company to sending endless
            applications.
          </p>
          <a href="blog-single-post.html" class="button">Read More</a>
        </div>
      </div>

      <div class="one-third column">
        <!-- Post #2 -->
        <div class="recent-post">
          <div class="recent-post-img">
            <a href="blog-single-post.html"
              ><img src="images/recent-post-02.jpg" alt=""
            /></a>
            <div class="hover-icon"></div>
          </div>
          <a href="blog-single-post.html">
            <h4>How to "Woo" a Recruiter and Land Your Dream Job</h4>
          </a>
          <div class="meta-tags">
            <span>September 12, 2015</span>
            <span><a href="#">0 Comments</a></span>
          </div>
          <p>
            Struggling to find your significant other the perfect Valentine’s
            Day gift? If I may make a suggestion: woo a recruiter.
          </p>
          <a href="blog-single-post.html" class="button">Read More</a>
        </div>
      </div>

      <div class="one-third column">
        <!-- Post #3 -->
        <div class="recent-post">
          <div class="recent-post-img">
            <a href="blog-single-post.html"
              ><img src="images/recent-post-03.jpg" alt=""
            /></a>
            <div class="hover-icon"></div>
          </div>
          <a href="blog-single-post.html">
            <h4>11 Tips to Help You Get New Clients Through Cold Calling</h4>
          </a>
          <div class="meta-tags">
            <span>August 27, 2015</span>
            <span><a href="#">0 Comments</a></span>
          </div>
          <p>
            If your dream employer appears on this list, you’re certainly in
            good company. But it also means you’re up for some intense
            competition.
          </p>
          <a href="blog-single-post.html" class="button">Read More</a>
        </div>
      </div>
    </div>

    <!-- Footer
================================================== -->
    <div class="margin-top-15"></div>

    <div id="footer">
      <!-- Main -->
      <div class="container">
        <div class="seven columns">
          <h4>About</h4>
          <p>
            Morbi convallis bibendum urna ut viverra. Maecenas quis consequat
            libero, a feugiat eros. Nunc ut lacinia tortor morbi ultricies
            laoreet ullamcorper phasellus semper.
          </p>
          <a href="#" class="button">Get Started</a>
        </div>

        <div class="three columns">
          <h4>Company</h4>
          <ul class="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Our Blog</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Hiring Hub</a></li>
          </ul>
        </div>

        <div class="three columns">
          <h4>Press</h4>
          <ul class="footer-links">
            <li><a href="#">In the News</a></li>
            <li><a href="#">Press Releases</a></li>
            <li><a href="#">Awards</a></li>
            <li><a href="#">Testimonials</a></li>
            <li><a href="#">Timeline</a></li>
          </ul>
        </div>

        <div class="three columns">
          <h4>Browse</h4>
          <ul class="footer-links">
            <li><a href="#">Freelancers by Category</a></li>
            <li><a href="#">Freelancers in USA</a></li>
            <li><a href="#">Freelancers in UK</a></li>
            <li><a href="#">Freelancers in Canada</a></li>
            <li><a href="#">Freelancers in Australia</a></li>
            <li><a href="#">Find Jobs</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom -->
      <div class="container">
        <div class="footer-bottom">
          <div class="sixteen columns">
            <h4>Follow Us</h4>
            <ul class="social-icons">
              <li>
                <a class="facebook" href="#"><i class="icon-facebook"></i></a>
              </li>
              <li>
                <a class="twitter" href="#"><i class="icon-twitter"></i></a>
              </li>
              <li>
                <a class="gplus" href="#"><i class="icon-gplus"></i></a>
              </li>
              <li>
                <a class="linkedin" href="#"><i class="icon-linkedin"></i></a>
              </li>
            </ul>
            <div class="copyrights">
              © Copyright 2018 by <a href="#">Work Scout</a>. All Rights
              Reserved.
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Back To Top Button -->
    <div id="backtotop">
      <a href="#"></a>
    </div>
  </div>
</template>

<script>

import headerLayout from '@/components/layouts/header.vue';
import findLayout from '@/components/layouts/find.vue';
import catagoryLayout from '@/components/layouts/catagory.vue';
import recentjobsLayout from '@/components/layouts/recentjobs.vue';
import jobspotlightLayout from '@/components/layouts/jobspotlight.vue'
export default {
  name: 'Home',
  components: {
    headerLayout,
    findLayout,
    catagoryLayout,
    recentjobsLayout,
    jobspotlightLayout
  },
};
</script>
