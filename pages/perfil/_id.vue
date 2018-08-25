<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-10 offset-md-1">
                    <div class="card mt-2">
                        <div class="card-header">
                            <span class="float-right">{{nome}}</span>  
                        </div>
                        <div class="card-body">
                            <h6 class="card-title text-center"><img src="https://royaleapi.com/static/img/ui/trophy.png" style="width:30px; display: inline;">Troféus atuais: {{trofeus}}</h6>
                            <hr>
                            <p class="card-text text-center">Arena atual: <span class="badge badge-danger">{{arena}}</span> </p>
                            <hr>
                            <p class="card-text text-center">Doações totais: <span class="badge badge-success">{{donates}}</span> </p>
                            <hr>
                            <p class="card-text text-center"><img src="https://royaleapi.com/static/img/ui/trophy.png" style="width:30px; display: inline;">Maior pontuação:  {{trofeusMax}} </p>
                            <hr>
                            <p class="card-text text-center">Vitória/Partidas: <span class="badge badge-success">{{vd}}</span> </p>
                            <hr>
                            <div class="alert alert-warning" role="alert">
                                Próximos baús:
                                <div style="display : inline;" v-for="bau in baus" :key="bau.id">
                                    <div style="display: inline;" v-if="bau==='silver'"><img src="https://royaleapi.com/static/img/chests/chest-silver.png" alt="Bau de Prata" width="50px"></div>
                                    <div style="display: inline;" v-else-if="bau === 'gold'"><img src="https://royaleapi.com/static/img/chests/chest-golden.png" alt="Bau de Ouro" width="50px" ></div>
                                    <div style="display: inline;" v-else-if="bau === 'magical'"><img src="https://royaleapi.com/static/img/chests/chest-magical.png" alt="Bau mágico" width="50px" ></div>
                                    <div style="display: inline;" v-else-if="bau === 'superMagical'"><img src="https://royaleapi.com/static/img/chests/chest-supermagical.png" alt="Bau super mágico" width="50px" ></div>
                                    <div style="display: inline;" v-else-if="bau === 'legendary'"><img src="https://royaleapi.com/static/img/chests/chest-legendary.png" alt="Bau lendário" width="50px" ></div>    
                                    <div style="display: inline;" v-else-if="bau === 'epic'"><img src="https://royaleapi.com/static/img/chests/chest-epic.png" alt="Bau épico" width="50px" ></div>
                                    <div style="display: inline;" v-else-if="bau === 'giant'"><img src="https://royaleapi.com/static/img/chests/chest-giant.png" alt="Bau gigante" width="50px" ></div>
                                </div> 
                            </div>
                            <div class="card">
                                    <div class="card-header">
                                            <span class="card-title">Gráfico de Desempenho de {{nome}}</span>
                                    </div>
                                <div class="card-body">
                                    <div class="col-md-6 offset-md-3">
                                        <linhas
                                            :data="chartData"
                                            :options="{responsive: true, maintainAspectRatio: true}"
                                            :width="400"
                                            :height="200"
                                        > 
                                        </linhas>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="text-center mt-2">
                                <nuxt-link class="btn btn-outline-danger" to="/">Voltar</nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Linhas from '@/components/GraficoLinhas'
import axios from 'axios'
export default {
    components:{
        Linhas
    },
  data: () => ({
      nome:'',
        nivel:'',
        trofeus:'',
        arena:'',
        donates:'',
        trofeusMax:'',
        vd:'',
        baus:[],
        chartData:{
            labels: ['Inicio', 'Atual'],
            datasets: [
                {
                label: 'Exemplooo',
                backgroundColor: '#f87979',
                data: [0, 80]
                }
            ]
        }
  }),
  async created(){
       const perfil = await this.getProfile();
       const baus = await this.getBaus();
  },
  methods: {
    getBaus: function(){
      axios
        .get('https://api.royaleapi.com/player/'+this.$route.params.id+'/chests', {
          headers: {
            auth:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ0MCwiaWRlbiI6IjM2NTU5NTM1NTg1MDYwNDU1NSIsIm1kIjp7fSwidHMiOjE1MzM5MTk4MTAzODh9.pP960WHJcU-Cv3IRa090VkpT7bPfu422GffYM5IN2-k'
          }
        })
        .then(res => {
            this.baus = res.data.upcoming
        })
        .catch(error => {
          console.log('error 3 ' + error)
        })  
    },
    getProfile: function() {
      axios
        .get('https://api.royaleapi.com/player/'+this.$route.params.id, {
          headers: {
            auth:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ0MCwiaWRlbiI6IjM2NTU5NTM1NTg1MDYwNDU1NSIsIm1kIjp7fSwidHMiOjE1MzM5MTk4MTAzODh9.pP960WHJcU-Cv3IRa090VkpT7bPfu422GffYM5IN2-k'
          }
        })
        .then(res => {
            this.nome = res.data.name
            this.trofeus = res.data.trophies
            this.arena = res.data.arena.arenaID
            this.donates = res.data.clan.donations
            this.trofeusMax = res.data.stats.maxTrophies
            this.vd = res.data.games.winsPercent
        })
        .catch(error => {
          console.log('error 3 ' + error)
        })
    }
  }
};
</script>
