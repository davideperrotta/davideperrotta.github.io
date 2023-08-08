<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
  info: String,
})

const count = ref(0)
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
    and NodeJS stack, with ReactJS for web applications, React Native for mobile applications and NodeJS, Express and
    MongoDB for backend development. I’m a Technical Leader and I like teaching what I do too.
  </p>
  <div class="horizontal-line" />
  <h2>
    Most requested services
  </h2>
  <p>
    I provide digital development services, at this moment the most requested are:
  </p>
  <div class="tech-list">
    <dl>
      <dt>Frontend</dt>
      <dd>JavaScript (React, NextJS)</dd>

      <dt>Backend</dt>
      <dd>JavaScript (NestJS)</dd>

      <dt>Mobile</dt>
      <dd>React-Native</dd>

      <dt>Server side</dt>
      <dd>NodeJS</dd>

      <dt>Database</dt>
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
        <h4>Senior Consultant @ Deloitte Digital</h4>
        <p class="subDetails"><em>Milano, Italy</em> | <em>July 2018</em> –&nbsp;<em>Present</em></p>
        <p>Enterprise websites development, single page applications, mobile apps. Technical Leader, Team Leader</p>
      </article>
      <span class="small-separator">___</span>
      <article>
        <h4>Software Developer @ ThinkOpen SRL</h4>
        <p class="subDetails"><em>Milano, Italy</em> | <em>Oct 2017</em> – <em>July 2018</em></p>
        <p>Frontend development for public administrations and banking.</p>
      </article>
      <span class="small-separator">___</span>
      <article>
        <h4>Full-Stack Web Developer @ INAMO Web Agency</h4>
        <p class="subDetails"><em>Calabria, Italy</em> | <em>September 2015</em> – <em>April 2017</em></p>
        <p>Analysis and backend / frontend development for e-commerce websites. Environments management, optimization,
          upgrade and support. Development of relational databases.</p>
      </article>
      <span class="small-separator">___</span>
      <article>
        <h4>Full-Stack Web Developer @ Ebizlab SRL</h4>
        <p class="subDetails"><em>Calabria, Italy</em> | <em>March 2015</em> – <em>August 2015</em></p>
        <p>Frontend and backend development for e-commerce websites.</p>
      </article>
      <div class="horizontal-line" />
      <section>
        <h2>Tech Skills</h2>
        <p>
          HTML, SASS, JavaScript, React, React Native, NextJS, VueJS, SvelteJS, NodeJS, Web Sockets, Unit and frontend
          testing, AWS Cloud, Google Cloud, CI/CD with Git and Pipelines, SQL/NoSQL Databases like MySQL / MongoDB /
          DocumentDB, Caching with Redis / MemoryDB / client-side caching, REST API development, IT Cloud Architectures
          development, Web Security (Pen-Test major vulnerabilities), Docker and Container based deployments, Experience
          with major CMS and E-commerce platforms (including payments).
        </p>
        <div class="horizontal-line" />
        <h2>Soft Skills</h2>
        <p>
          Lead developer, team leader, trainer. Management of all development flows into teams, link among the tech team,
          the company management and the customers.
        </p>
      </section>
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
      <div class="horizontal-line" />
      <section>
        <div class="sectionTitle">
          <h2>Education</h2>
        </div>
        <div class="sectionContent">
          <article>
            <h4>Qualified ICT Engineer</h4>
            <p class="subDetails">Politecnico di Milano, 02/2023</p>
          </article>
          <span class="small-separator">___</span>
          <article>
            <h4>Biomedical Engineering&nbsp;<b>Master’s Degree</b></h4>
            <p class="subDetails">Magna Graecia University, Catanzaro (Italy), 10/2017</p>
          </article>
          <span class="small-separator">___</span>
          <article>
            <h4>Computer and Biomedical Engineering&nbsp;<b>Bachelor’s Degree</b></h4>
            <p class="subDetails">Magna Graecia University, Catanzaro (Italy)</p>
          </article>
          <span class="small-separator">___</span>
          <article>
            <h4>Scientific High School</h4>
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

<!--<div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>--></template>

<style scoped>.read-the-docs {
  color: #888;
}</style>
