<template>
  <footer id="footer" class="sticky-bottom mt-5">
    <b-container class="pt-5 pb-4">
      <h6 class="text-uppercase font-weight-bold"><strong>Authors</strong></h6>
      <hr class="bg-primary mb-3 mt-1 d-inline-block mx-auto" style="width: 60px">
      <b-row class="my-1">
        <b-col>
          Alessandro Aurora
          <span class="h4 ml-4 mr-2">
            <a href="https://github.com/Rastark" target="_blank">
              <b-icon icon="github" variant="light"></b-icon>
            </a>
          </span>
          <span class="h4 mx-2">
            <a href="https://www.linkedin.com/in/alessandro-aurora-160389113/" target="_blank">
              <b-icon icon="linkedin" variant="light"></b-icon>
            </a>
          </span>
        </b-col>
        <b-col>
          Matteo Petruzziello
          <span class="h4 ml-4 mr-2">
            <a href="https://github.com/petruz93" target="_blank">
              <b-icon icon="github" variant="light"></b-icon>
            </a>
          </span>
          <span class="h4 mx-2">
            <a href="https://www.linkedin.com/in/matteo-petruzziello-698a04161/" target="_blank">
              <b-icon icon="linkedin" variant="light"></b-icon>
            </a>
          </span>
        </b-col>
      </b-row>
    </b-container>
    <div class="footer-copyright py-3 text-monospace">
      <b-container fluid>
        2020 University of Roma Tre, Rome IT
      </b-container>
    </div>
  </footer>
</template>


<script>
export default {
  name: 'Footer'
}
</script>


<style>
#footer {
  background-color: var(--black-474747);
}
.footer-copyright {
  background-color: var(--black-333333);
}
</style>