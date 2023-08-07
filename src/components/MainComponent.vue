<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>
  <h2>
    IT services and digital development
  </h2>
  <p>
    Qualified ICT Engineer, graduated with Engineering Master’s Degree, professional experience in designing and developing
    web applications. I started developing web applications in 2014 using PHP and LAMP stack, then I moved into JavaScript
    and NodeJS stack, with ReactJS for web applications, React Native for mobile applications and NodeJS, Express and
    MongoDB for backend development. I’m a Technical Leader and I like teaching what I do too.
  </p>
  <hr />
  <h2>
    Most requested services
  </h2>
  <p>
    I provide digital development services for companies, the most requested are:
  </p>
  <table>
    <tbody>
      <tr>
        <th class="has-text-align-center" data-align="center"><strong>Context</strong></th>
        <th class="has-text-align-center" data-align="center"><strong>Technologies</strong></th>
      </tr>
      <tr>
        <td class="has-text-align-center" data-align="center">Frontend</td>
        <td class="has-text-align-center" data-align="center">JavaScript (React, NextJS)</td>
      </tr>
      <tr>
        <td class="has-text-align-center" data-align="center">Backend</td>
        <td class="has-text-align-center" data-align="center">JavaScript (NestJS)</td>
      </tr>
      <tr>
        <td class="has-text-align-center" data-align="center">Mobile</td>
        <td class="has-text-align-center" data-align="center">React-Native</td>
      </tr>
      <tr>
        <td class="has-text-align-center" data-align="center">Server side</td>
        <td class="has-text-align-center" data-align="center">NodeJS</td>
      </tr>
      <tr>
        <td class="has-text-align-center" data-align="center">Database</td>
        <td class="has-text-align-center" data-align="center">SQL, NoSQL (MongoDB), Redis</td>
      </tr>
    </tbody>
  </table>
  <hr />
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
      <article>
        <h4>Software Developer @ ThinkOpen SRL</h4>
        <p class="subDetails"><em>Milano, Italy</em> | <em>Oct 2017</em> – <em>July 2018</em></p>
        <p>Frontend development for public administrations and banking.</p>
      </article>
      <article>
        <h4>Full-Stack Web Developer @ INAMO Web Agency</h4>
        <p class="subDetails"><em>Calabria, Italy</em> | <em>September 2015</em> – <em>April 2017</em></p>
        <p>Analysis and backend / frontend development for e-commerce websites. Environments management, optimization,
          upgrade and support. Development of relational databases.</p>
      </article>
      <article>
        <h4>Full-Stack Web Developer @ Ebizlab SRL</h4>
        <p class="subDetails"><em>Calabria, Italy</em> | <em>March 2015</em> – <em>August 2015</em></p>
        <p>Frontend and backend development for e-commerce websites.</p>
      </article>
      <section>
        <hr />
        <div class="sectionTitle">
          <h2>Main Key Skills</h2>
        </div>
        <div class="sectionContent">
          <p>Javascript for frontend and backend development, React based frameworks, SQL / NoSQL / Caching databases,
            NodeJS with latest frameworks, CSS latest frameworks.</p>
        </div>
      </section>
      <hr />
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
      <hr />
      <section>
        <div class="sectionTitle">
          <h2>Education</h2>
        </div>
        <div class="sectionContent">
          <article>
            <h4>Qualified ICT Engineer</h4>
            <p class="subDetails">Politecnico di Milano, 02/2023</p>
          </article>
          <hr />
          <article>
            <h4>Biomedical Engineering&nbsp;<b>Master’s Degree</b></h4>
            <p class="subDetails">Magna Graecia University, Catanzaro (Italy), 10/2017</p>
          </article>
          <hr />
          <article>
            <h4>Computer and Biomedical Engineering&nbsp;<b>Bachelor’s Degree</b></h4>
            <p class="subDetails">Magna Graecia University, Catanzaro (Italy)</p>
          </article>
          <hr />
          <article>
            <h4>Scientific High School</h4>
            <p class="subDetails">Catanzaro (Italy)</p>
          </article>
        </div>
        <div class="clear">&nbsp;</div>
      </section>
    </div>
  </div>
  <div>
    <h2>Links</h2>
    <ul><li ><a  href="https://linkedin.com/in/davideperrotta" target="_blank" title="Linkedin"><span >LinkedIn</span></a></li><li ><a  href="https://photos.google.com/share/AF1QipMyrbvBPNZL6OWx51TYCDHEO9vQrxynJCOrFPEobDV2seDAP_9Cd1Vh_ZvA-1uiFA?key=eGQ5Z25zREtRcWxGNkxVVUNtUV9ET3hZdVM5VW1n" target="_blank" title=""><span >Photos</span></a></li><li ><a  href="https://www.youtube.com/c/DavidePerrotta" target="_blank" title=""><span >YouTube</span></a></li><li ><a  href="https://strava.com/athletes/davideperrotta" target="_blank" title=""><span >Strava</span></a></li></ul>
  </div>

  <!--<div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>-->

</template>

<style scoped>
.read-the-docs {
  color: #888;
}</style>
