<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
  info: String,
})

const count = ref(0)
const iconWidth = 32;
</script>

<template>
  <h1 class="title">{{ msg }}</h1>
  <!--<h2 class="subtitle">{{ info }}</h2>-->
  <table class="resume-table">
    <tbody>
      <tr>
        <td>Born in</td>
        <td>1991, Italy (CZ)</td>
      </tr>
      <tr>
        <td>Nationality</td>
        <td>Italian</td>
      </tr>
      <tr>
        <td>Live in</td>
        <td>Milano, Italy</td>
      </tr>
      <tr>
        <td>Degree</td>
        <td>ICT Engineer</td>
      </tr>
      <tr>
        <td>Job</td>
        <td>Developer, Tech Lead</td>
      </tr>
      <tr>
        <td>Working from</td>
        <td>2014</td>
      </tr>
      <tr>
        <td>Languages</td>
        <td>Italian, English</td>
      </tr>
      <tr>
        <td>Hobbies</td>
        <td>Playing bass guitar and guitar</td>
      </tr>
      <tr>
        <td>Sports</td>
        <td>Running, Mountain bike</td>
      </tr>
      <tr>
        <td>Open to</td>
        <td>Collaborations with developers</td>
      </tr>
    </tbody>
  </table>
  <p>
    Qualified ICT Engineer, graduated with Engineering Master’s Degree, professional experience in designing and
    developing
    web applications. I started developing web applications in 2014 using PHP and LAMP stack, then I moved into JavaScript
    and NodeJS stack, with ReactJS for web applications, React Native or Flutter for mobile applications and NodeJS, Express and
    MongoDB for backend development, hosted on AWS Cloud. I’m a Technical Leader and I like teaching what I do too.
  </p>
  <div class="horizontal-line" />
  <h2>
    Most requested services
  </h2>
  <p class="orange">
    I provide digital development services, most in-demand technologies are:
  </p>
  <div>
    <img src="/icons/React.svg" class="logo" alt="React logo" :style="{ width: `${iconWidth}px`}" />
    <img src="/icons/Node.js.svg" class="logo" alt="Node logo" :style="{ width: `${iconWidth}px`}" />
    <img src="/icons/MongoDB.svg" class="logo" alt="MongoDB logo" :style="{ width: `${iconWidth}px`}" />
    <img src="/icons/Redis.svg" class="logo" alt="Redis logo" :style="{ width: `${iconWidth}px`}" />
    <img src="/icons/AWS.svg" class="logo" alt="AWS logo" :style="{ width: `${iconWidth}px`}" />
    <img src="/icons/Docker.svg" class="logo" alt="Docker logo" :style="{ width: `${iconWidth}px`}" />
    <img src="/icons/Next.js.svg" class="logo" alt="Next logo" :style="{ width: `${iconWidth}px`}" />
    <img src="/icons/Nest.js.svg" class="logo" alt="Nest logo" :style="{ width: `${iconWidth}px`}" />
    <img src="/icons/flutter.svg" class="logo" alt="Flutter logo" :style="{ width: `${iconWidth}px`}" />
  </div>
  <div class="tech-list">
    <dl>
      <dt class="purple">Frontend</dt>
      <dd>JavaScript (React, NextJS)</dd>

      <dt class="purple">Backend</dt>
      <dd>JavaScript (NestJS)</dd>

      <dt class="purple">Mobile</dt>
      <dd>React-Native, Flutter</dd>

      <dt class="purple">Server side</dt>
      <dd>NodeJS (on AWS Cloud)</dd>

      <dt class="purple">Database</dt>
      <dd>MongoDB, Redis (Caching)</dd>
    </dl>
  </div>
  <div class="horizontal-line" />
  <div class="sectionContent">
    <div class="sectionTitle">
      <h2>Work Experience</h2>
    </div>
    <div class="sectionContent">
      <article>
        <h4 class="purple">Senior Consultant @ Deloitte Digital</h4>
        <p class="subDetails"><em>Milano, Italy</em> | <em>July 2018</em> –&nbsp;<em>Present</em></p>
        <p class="work-experience-detail">Enterprise websites development, single page applications, mobile apps. Technical Leader, Team Leader</p>
      </article>
      <span class="small-separator">___</span>
      <article>
        <h4 class="purple">Software Developer @ ThinkOpen SRL</h4>
        <p class="subDetails"><em>Milano, Italy</em> | <em>Oct 2017</em> – <em>July 2018</em></p>
        <p class="work-experience-detail">Frontend development for public administrations and banking.</p>
      </article>
      <span class="small-separator">___</span>
      <article>
        <h4 class="purple">Full-Stack Web Developer @ INAMO Web Agency</h4>
        <p class="subDetails"><em>Calabria, Italy</em> | <em>September 2015</em> – <em>April 2017</em></p>
        <p class="work-experience-detail">Analysis and backend / frontend development for e-commerce websites. Environments management, optimization,
          upgrade and support. Development of relational databases.</p>
      </article>
      <span class="small-separator">___</span>
      <article>
        <h4 class="purple">Full-Stack Web Developer @ Ebizlab SRL</h4>
        <p class="subDetails"><em>Calabria, Italy</em> | <em>March 2015</em> – <em>August 2015</em></p>
        <p class="work-experience-detail">Frontend and backend development for e-commerce websites.</p>
      </article>
      <span class="small-separator">___</span>
      <article>
        <h4 class="purple">Full-Stack Web Developer @ Magna Graecia University</h4>
        <p class="subDetails"><em>Catanzaro, Italy</em> | <em>September 2014</em> – <em>July 2015</em></p>
        <p class="work-experience-detail">Internship, development of a healthcare web application for degree thesis with both backend and frontend.</p>
      </article>
      <div class="horizontal-line" />
      <section>
        <h2>Tech Skills</h2>
        <p>
          HTML, SASS, <span class="cyan">JavaScript</span>, ECMAScript, <span class="cyan">React</span>, React Native, <span class="cyan">Flutter</span>, Dart, NextJS, VueJS, SvelteJS, <span class="cyan">NodeJS</span>, Web Sockets, Unit and frontend
          testing, <span class="cyan">Amazon Web Services (AWS) Cloud</span>, Google Cloud, CI/CD with Git and Pipelines, SQL/NoSQL Databases like MySQL / <span class="cyan">MongoDB</span> /
          DocumentDB, Caching with Redis / MemoryDB / client-side caching, REST API development, IT Cloud Architectures
          development, <span class="cyan">Web Security</span> (Pen-Test major vulnerabilities), <span class="cyan">Docker</span> and Container based deployments, Experience
          with major CMS and E-commerce platforms (including payments), <span class="cyan">Python</span>, Java, C, Arduino.
        </p>
      </section>
      <div class="horizontal-line" />
        <!--<h2>Soft Skills</h2> <></>
        <p>
          Lead developer, technical and team leader, trainer. Management of all development flows into teams, link among the tech team,
          the company management and the customers.
        </p>
      <div class="horizontal-line" />
      <section>
        <div class="sectionTitle">
          <h2>Languages certifications</h2>
        </div>
        <div class="sectionContent">
          <ul>
            <li>Business English Level 10&nbsp;<b>(C2)</b></li>
            <li>Business English Level 7&nbsp;<b>(C1)</b></li>
            <li>Business English Level 6&nbsp;<b>(B2)</b></li>
            <li>Business English Level 5&nbsp;<b>(B2)</b></li>
            <li>Cambridge PET English Certification&nbsp;<b>(B1)</b></li>
            <li>Trinity grade 5 English Certification</li>
            <li>Trinity grade 4 English Certification</li>
            <li>DELF Scolaire niveau 1 Français Certification</li>
          </ul>
        </div>
      </section>
      <div class="horizontal-line" />-->
      <section>
        <div class="sectionTitle">
          <h2>Education</h2>
        </div>
        <div class="sectionContent">
          <article>
            <h4 class="purple">Qualified ICT Engineer</h4>
            <p class="subDetails">Politecnico di Milano (Italy), 02/2023</p>
          </article>
          <span class="small-separator">___</span>
          <article>
            <h4 class="purple">Biomedical Engineering&nbsp;<b>Master’s Degree</b></h4>
            <p class="subDetails">Magna Graecia University, Catanzaro (Italy), 10/2017</p>
          </article>
          <span class="small-separator">___</span>
          <article>
            <h4 class="purple">Computer and Biomedical Engineering&nbsp;<b>Bachelor’s Degree</b></h4>
            <p class="subDetails">Magna Graecia University, Catanzaro (Italy)</p>
          </article>
          <span class="small-separator">___</span>
          <article>
            <h4 class="purple">Scientific High School</h4>
            <p class="subDetails">Catanzaro (Italy)</p>
          </article>
        </div>
        <div class="clear">&nbsp;</div>
      </section>
      <div class="horizontal-line" />
    </div>
  </div>
  <div>
    <h2>Links</h2>
    <ul>
      <li><a href="https://linkedin.com/in/davideperrotta" target="_blank" title="Linkedin"><span>LinkedIn</span></a></li>
      <li><a href="https://www.youtube.com/c/DavidePerrotta" target="_blank" title=""><span>YouTube</span></a></li>
    </ul>
    <p class="further-info">
      <div>For further informations <span class="yellow">contact me</span> on LinkedIn, or send me an email at</div>
      <div><span class="cyan">name</span> <span class="green">dot</span> <span class="cyan">surname</span> <span class="green">at</span> <span class="cyan">outlook</span> <span class="green">dot</span> <span class="cyan">it</span></div>
      <div>remembering that Davide is the name.</div>
    </p>
  </div>
</template>

<style scoped>.read-the-docs {
  color: #888;
}</style>
