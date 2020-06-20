<template>
  <div class="home">
    <div class="container my-5">
      <div class="row justify-content-center my-5">
        <div class="col-md-6">
          <figure class="figure image-filter">
            <img src="@/assets/stonk.jpg" class="figure-img img-fluid rounded" alt="Stonk!">
          </figure>
        </div>
      </div>
      <div class="row justify-content-center my-5">
        <div class="col-md-6">
          <form action="" @submit.prevent="fetch">
            <div class="input-group mb-3">
              <span class="input-group-text">=></span>
              <input type="text" class="form-control" :class="{'is-invalid': isError, 'is-valid': isError === false}" v-model="stockID" placeholder="Stock ID" autofocus required>
              <button type="submit" class="input-group-text btn btn-n-purple text-light">發財啦</button>
              <div class="invalid-feedback">
                Srsly?
              </div>
              <div class="valid-feedback">
                Stonks!
              </div>
            </div>
            <div id="stockTypeGroup" class="my-2">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="stockType" value="tse" name="stockType" id="stockTypeTSE" checked>
                <label class="form-check-label" for="stockTypeTSE">上市</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="stockType" value="otc" name="stockType" id="stockTypeOTC" disabled>
                <label class="form-check-label" for="stockTypeOTC">上櫃</label>
              </div>
            </div>
            <div id="stockTimeGroup" class="my-2">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="stockTime" value="" name="stockTime" id="stockTimeRealTime" checked>
                <label class="form-check-label" for="stockTimeRealTime">即時資訊</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="stockTime" value="otc" name="stockTime" id="stockTimeDatePick" disabled>
                <label class="form-check-label" for="stockTimeDatePick">指定日期</label>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row justify-content-center my-5 result-panel">
        <loading loader="bars" 
          :active.sync="isLoading"
          :is-full-page="false">
        </loading>
        <div class="col-md-6">
          <div class="card text-center">
            <div class="card-header">
              {{ stockInfo.nf }}
            </div>
            <div class="card-body">
              <h3 class="card-title my-3">{{ stockInfo.n }} - {{ stockInfo.c }} [{{ stockInfo.ex }}]</h3>
              <div :class="priceColor(stockInfo.z)">
                <h1 class="card-text">{{ stockInfo.z }}</h1>
                <h5 class="card-text d-inline">
                  <svg v-if="this.stockInfo.z < this.stockInfo.y" class="bi bi-caret-down-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                  </svg>
                  <svg v-if="this.stockInfo.z > this.stockInfo.y" class="bi bi-caret-up-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                  </svg>
                  {{ (this.stockInfo.z - this.stockInfo.y) | rounding }}
                </h5>
                <h5 class="card-text d-inline">{{ (((this.stockInfo.z - this.stockInfo.y) / this.stockInfo.y) * 100) | rounding }}%</h5>
              </div>
              <div class="card-text my-5">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>開盤</th>
                        <th>昨日收盤</th>
                        <th>最高</th>
                        <th>最低</th>
                        <th>成交量</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{{ stockInfo.o }}</td>
                        <td>{{ stockInfo.y }}</td>
                        <td :class="priceColor(stockInfo.h)">{{ stockInfo.h }}</td>
                        <td :class="priceColor(stockInfo.l)">{{ stockInfo.l }}</td>
                        <td>{{ stockInfo.v }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="card-text">
                <div class="table-responsive">
                  <table class="table text-right">
                    <tbody>
                      <tr>
                        <th class="text-left" scope="row">五檔買價</th>
                        <td :class="priceColor(item)" v-for="item in stockInfo.b" :key="item">{{ item }}</td>
                      </tr>
                      <tr>
                        <th class="text-left" scope="row">委買量</th>
                        <td v-for="item in stockInfo.g" :key="item">{{ item }}</td>
                      </tr>
                      <tr>
                        <th class="text-left" scope="row">五檔賣價</th>
                        <td :class="priceColor(item)" v-for="item in stockInfo.a" :key="item">{{ item }}</td>
                      </tr>
                      <tr>
                        <th class="text-left" scope="row">委賣量</th>
                        <td v-for="item in stockInfo.f" :key="item">{{ item }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p class="card-text"></p>
              <a :href="`https://invest.cnyes.com/twstock/tws/${stockInfo.c}`" class="btn btn-n-purple text-light my-5" :class="{'disabled': isDisabled}" target="_blank">More Details</a>
            </div>
            <div class="card-footer text-muted">
              {{ stockInfo.d }} {{ stockInfo.t }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'Home',
  components: {
    loading: VueLoading,
  },
  data() {
    return {
      stockID: '',
      stockType: 'tse',
      stockTime: '',
      stockInfo: {
        a: [],
        b: [],
        f: [],
        g: []
      },
      isLoading: false,
      isDisabled: true,
      isError: undefined,
    }
  },
  methods: {
    fetch() {
      const api = `https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=${this.stockType}_${this.stockID.trim()}.tw&json=1&delay=0`
      this.isLoading = true;
      this.$http.get(`https://cors-anywhere.herokuapp.com/${api}`, {
        headers: {}
      }).then(response => {
        this.isLoading = false;
        if (response.data === '' || response.data.msgArray.length === 0) {
          this.isError = true;
          this.stockInfo = {};
        } else {
          this.isError = false;
          this.isDisabled = false;
          this.stockInfo = response.data.msgArray[0];
          this.stockInfo.a = response.data.msgArray[0].a.split('_');
          this.stockInfo.b = response.data.msgArray[0].b.split('_');
          this.stockInfo.f = response.data.msgArray[0].f.split('_');
          this.stockInfo.g = response.data.msgArray[0].g.split('_');
          this.stockInfo.a.pop()
          this.stockInfo.b.pop()
          this.stockInfo.f.pop()
          this.stockInfo.g.pop()
        }
      });
    },
    priceColor: function(value) {
      if (value > this.stockInfo.y) {
        return {
          ask: true,
        }
      } else if (value < this.stockInfo.y) {
        return {
          bid: true
        }
      }
      return {
        same: true
      }
    },
  },
  computed: {
  },
  filters: {
    rounding(value) {
      return Math.abs(Math.round(value * 100) / 100)
    }
  }
}
</script>

<style lang="scss">
  .result-panel {
    position: relative;
  }
  .ask {
    color: rgb(218, 117, 117);
  }
  .bid {
    color: rgb(105, 218, 171);
  }
</style>
