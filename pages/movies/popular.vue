<template>
  <div class="container-fluid">
    <b-row>
      <b-col>
        <h1 class="h3 text-center">Popular Movies</h1>
        <b-nav-form class="">
          <b-form-input
            v-model.lazy="searchInput"
            class="mr-sm-2"
            placeholder="Search"
          ></b-form-input>
          <b-button
            variant="outline-info"
            class="my-2 my-sm-0"
            type="submit"
            :disabled="!searchInput"
            @click.prevent="searchMovies"
            >Search</b-button
          >
          <b-button
            v-if="searchInput.length >= 1"
            variant="outline-info"
            class="ml-2"
            type="submit"
            @click="clearSearch"
            >Clear Search</b-button
          >
        </b-nav-form>
      </b-col>
    </b-row>
    <b-container v-if="isSearch" fluid class="mt-5 p-0">
      <b-row>
        <div
          v-for="(movies, index) in popularMovies.data.results"
          id="popularMovies"
          :key="index"
          class="col-lg-3 mb-4"
        >
          <div class="card">
            <div class="rating">{{ movies.vote_average }}</div>
            <img
              id="show-btn"
              :src="`https://image.tmdb.org/t/p/w500/${movies.poster_path}`"
              class="card-img-top cursor-pointer"
              :alt="movies.title + ' ' + 'image'"
              :title="movies.title"
              @click="$bvModal.show('bv-modal' + movies.id)"
            />
            <div class="card-body bg-info text-white p-0">
              <h6 class="card-title m-2">
                {{ movies.title.slice(0, 35)
                }}<span v-if="movies.title.length > 35">...</span>
              </h6>
              <div class="card-text m-3">
                <small class="text-white d-block">
                  Audience: {{ movies.adult ? 'false' : 'All audiences' }}
                </small>
                <small class="text-white d-block"
                  >Release Date: {{ movies.release_date }}</small
                >
                <small class="text-white d-block text-uppercase">
                  Language: {{ movies.original_language }}
                </small>
              </div>
            </div>
          </div>
          <b-modal
            :id="'bv-modal' + movies.id"
            hide-footer
            size="lg"
            centered
            header-text-variant="info"
            body-text-variant="info"
          >
            <template #modal-title>
              {{ movies.title }}
            </template>
            <div class="modal-image text-center mb-3">
              <img
                :src="`https://image.tmdb.org/t/p/original/${movies.poster_path}`"
                :alt="movies.title + ' ' + 'image'"
                class="w-50"
              />
            </div>
            <div class="d-block text-center">
              <p>{{ movies.overview }}</p>
            </div>
            <b-button
              class="mt-3 bg-info"
              block
              @click="$bvModal.hide('bv-modal' + movies.id)"
              >Close Me</b-button
            >
          </b-modal>
        </div>
      </b-row>
      <b-pagination
        v-model="popularMovies.data.page"
        :total-rows="popularMovies.data.total_pages"
        aria-controls="popularMovies"
        hide-goto-end-buttons
        size="sm"
        pills
        align="center"
        last-numbe
        class="mt-2"
        @change="changePage"
      ></b-pagination>
    </b-container>
    <!-- search results -->
    <b-container v-else fluid class="mt-5 p-0">
      <b-row>
        <b-col
          v-for="(movie, index) in searchedMovies"
          :key="index"
          col
          lg="3"
          class="mb-4"
        >
          <div class="card">
            <div class="rating">{{ movie.vote_average }}</div>
            <img
              id="show-btn"
              :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
              class="card-img-top cursor-pointer"
              :alt="movie.title + ' ' + 'image'"
              :title="movie.title"
              @click="$bvModal.show('bv-modal' + movie.id)"
            />
            <div class="card-body bg-info text-white">
              <h5 class="card-title">{{ movie.title }}</h5>
              <div class="card-text">
                <small class="text-white d-block">
                  Audience: {{ movie.adult ? 'false' : 'All audiences' }}
                </small>
                <small class="text-white d-block"
                  >Release Date: {{ movie.release_date }}</small
                >
                <small class="text-white d-block text-uppercase">
                  Language: {{ movie.original_language }}
                </small>
              </div>
            </div>
          </div>
          <b-modal
            :id="'bv-modal' + movie.id"
            hide-footer
            size="lg"
            centered
            header-text-variant="info"
            body-text-variant="info"
          >
            <template #modal-title>
              {{ movie.title }}
            </template>
            <div class="modal-image text-center mb-3">
              <img
                :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
                :alt="movie.title + ' ' + 'image'"
                class="w-50"
              />
            </div>
            <div class="d-block text-center">
              <p>{{ movie.overview }}</p>
            </div>
            <b-button
              class="mt-3 bg-info"
              block
              @click="$bvModal.hide('bv-modal' + movie.id)"
              >Close Me</b-button
            >
          </b-modal>
        </b-col>
      </b-row>
    </b-container>
    <!-- end search results -->
  </div>
</template>

<script>
export default {
  name: 'PopularMovies',
  middleware: 'auth',
  async asyncData({ app, query }) {
    const popularMovies = await app.$axios.get(
      `/api/movie/popular?page=${query.page ? query.page : 1}`
    )
    return {
      popularMovies,
    }
  },
  data() {
    return {
      searchedMovies: [],
      searchInput: '',
      isSearch: true,
    }
  },
  computed: {},
  watchQuery: ['page'],
  methods: {
    async searchMovies() {
      this.isSearch = false
      const data = this.$axios.get(
        `/api/movie/search?language=en-US&query=${this.searchInput}`
      )
      const result = await data
      result.data.results.forEach((movie) => {
        this.searchedMovies.push(movie)
      })
    },
    changePage(pageNumber) {
      this.$router.push({
        query: {
          page: pageNumber,
        },
      })
    },
    clearSearch() {
      this.searchInput = ''
      this.searchedMovies = []
      this.isSearch = true
    },
  },
}
</script>

<style lang="scss" scoped>
.rating {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #c92502;
  color: #fff;
  border-radius: 0 0 16px 0;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);
}
</style>
