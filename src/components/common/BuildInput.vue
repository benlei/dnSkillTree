<template>
  <div class="row build-input">
    <div :class="cols[0]">
      <div class="input-group">
        <input title="Build URL" type="text" class="form-control" :value="buildUrl" id="build-url"/>
        <span class="input-group-btn">
          <button class="btn btn-secondary" type="button" @click="selectUrl">
            <i class="fa fa-files-o"/>
          </button>
        </span>
        <span class="input-group-btn">
          <button class="btn btn-secondary" type="button" @click="reset" title="Reset">
            <i class="fa fa-refresh"/>
          </button>
        </span>
        <span class="input-group-btn" v-if="!isMobile()">
          <button class="btn btn-secondary" type="button" title="Download Single Image"
                  @click="download">
            <i class="fa fa-download"/>
          </button>
        </span>
      </div>
    </div>
    <Alert :class="cols[1]"/>
    <!--<Help/>-->
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import Alert from './Alert';

  export default {
    props: ['cols'],
    data() {
      let location = window.location.href;
      location = location.substring(0, location.indexOf('#'));

      return {
        location,
      };
    },

    watch: {
      path(newPath) {
        const slug = this.$route.params.slug;
        const prefix = this.isMobile() ? 'mobile' : 'desktop';
        const name = newPath.length ? `${prefix}-build` : prefix;

        this.$router.replace({
          name,
          params: {
            slug,
            path: newPath,
          },
        });
      },
    },

    computed: {
      ...mapGetters([
        'path',
        'ascendancies',
      ]),

      buildUrl() {
        const path = this.path;
        const slug = this.$route.params.slug;
        const prefix = this.isMobile() ? '/m' : '';

        if (path.length) {
          return `${this.location}#${prefix}/${slug}/${this.path}`;
        }

        return `${this.location}#${prefix}/${slug}`;
      },
    },

    methods: {
      ...mapActions([
        'reset',
      ]),

      selectUrl() {
        document.getElementById('build-url').select();
      },

      download() {
        const ascendancy = this.build.ascendancy;
        const ascendancies = this.ascendancies;
        const slug = ascendancy === 3 ? `${ascendancies[2].slug}-awakened` : ascendancies[ascendancy].slug;

        html2canvas(document.getElementById('ascendancies'), {
          onrendered(canvas1) {
            html2canvas(document.getElementById('tree'), {
              onrendered(canvas2) {
                const ctx1 = canvas1.getContext('2d');
                const ctx2 = canvas2.getContext('2d');

                ctx2.fillStyle = '#fff';

                const data1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
                const data2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);

                const canvas = document.createElement('canvas');
                canvas.width = canvas1.width + canvas2.width + 20;
                canvas.height = canvas2.height;

                const ctx = canvas.getContext('2d');

                ctx.fillStyle = '#fff';
                ctx.fillRect(0, 0, canvas.width, canvas2.height);

                ctx.putImageData(data1, 0, 0);
                ctx.putImageData(data2, canvas1.width + 20, 0);

                const a = document.createElement('a');
                a.href = canvas.toDataURL('image/png');
                a.download = `${slug}.png`; // name of file
                a.style.display = 'none';
                a.click();
              },
            });
          },
        });
      },
    },

    components: {
      Alert,
    },
  };
</script>

<style>
  .build-input {
    margin-bottom: 1rem;
  }
</style>
