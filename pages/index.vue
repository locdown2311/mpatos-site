<template>
    <div class="container">
        <section class="row">
            <div class="col-md-8 offset-md-2 col-sm-10 offset-sm-1 ">
                <div class="card mt-2">
                    <div class="card-body">
                        <div class="text-center"><img class="card-img-top " :src="logoClan" alt="Logo do Clan" style="width: 30px;"> </div>
                        <h3 class="text-uppercase text-center">{{nomeClan}}</h3>
                        <hr>
                        <p class="text-center">Número de Membros: <span class="badge badge-success">{{qtdClan}}</span></p>
                        <hr>
                        <p class="text-center">Descrição : {{descClan}} </p>
                        <hr>
                        <p class="text-center">Troféus necessários : <img src="https://royaleapi.com/static/img/ui/trophy.png" style="width:30px; display: inline;"> {{numTro}}</p>
                        <hr>
                        <p class="text-center">Troféus atuais : <img src="https://royaleapi.com/static/img/ui/trophy.png" style="width:30px; display: inline;"> {{numTroTotal}}</p>
                        <hr>
                        <div class="text-center"><a class="btn btn-outline-success" target="_blank" href="https://chat.whatsapp.com/9ykylkEvaBcD7I0tsUgwsV" role="button">Grupo Whatsapp</a></div>
                    </div>
                </div>
            </div>
        </section>
        <section class="row">
          <div class="col-md-8 offset-md-2 col-sm-10 offset-sm-1">
            <div class="card mt-2">
                    <div class="card-body">
                        <div class="text-center"><img class="card-img-top " :src="logoClan" alt="Logo do Clan" style="width: 30px;"> </div>
                        <h3 class="text-uppercase text-center">Regras de boa conduta</h3>
                        <hr>
                        <ol>
                          <li><strong>Respeito a todos sempre</strong></li>
                          <li>Respeite os seus superiores </li>
                          <li>Doe cartas no minimo 1 vez ao dia</li>
                          <li>Peça cartas no minimo 1 vez ao dia</li>
                          <li>Se você é engraçadão: <i class="far fa-grin-squint"/>
                            <ul>
                              <li>Manere nas suas piadas, ninguem tem o mesmo humor que você</li>
                              <li>Trolou o clan de forma ridicula -><i class="fa fa-gavel"/> BAN</li>
                            </ul>
                          </li>
                          <li>Ao entrar no clan certifique-se de saudar a todos</li>
                          <li>Se você ficar muito tempo AFK sem motivo algum (estamos te vigiando) -> <i class="fa fa-gavel"/> BAN</li>
                          <li>Respeite a Líder Kitty, fez merda com ela -> <i class="fa fa-gavel"/> BAN IMEDIATO</li>
                          <li><strong><i class="fa fa-gavel"/>Todos os banimentos terão o motivo especificado<i class="fa fa-gavel"/></strong></li>
                          <li><span style="color: #ed5e1c;"><i class="fa fa-medal" style="color:#ffff00;"/> Se você for um membro fiel e seguir todas as regras certamente será promovido <i class="fa fa-medal" style="color:#ffff00;"/></span></li>
                          <li>No mais, seja bem vindo e esperamos não tem problemas</li>

                      </ol>
                        
                    </div>
                </div>
          </div>
        </section>
            <div class="row mt-2">
                <div class="col-md-3 mb-2" v-for="(membro) in this.membros" :key="membro.index">
                    <membro
                    :badge="logoClan"
                    :nome="membro.name"
                    :patente="membro.role"
                    :qtdExp="membro.expLevel"
                    :qtdTro="membro.trophies"
                    :arena="membro.arena.arenaID"
                    :linkPerfil="membro.tag"
                    >
                    </membro>
                </div>
            </div>
    </div>
</template>
<script>
import axios from 'axios'
import Membro from '@/components/Membro'
export default {
  components: {
    Membro
  },
  data: function () {
    return {
      nomeClan: '',
      logoClan: '',
      qtdClan: '',
      descClan: '',
      numTro: '',
      numTroTotal: '',
      membros: []
    }
  },
   async created() {
    const clan = await this.getClanInfo()
  },
  methods: {
    getClanInfo: function () {
      axios
        .get('https://api.royaleapi.com/clan/P8CP890R?keys=name,badge,memberCount,description,requiredScore,score,members', {
          headers: {
            auth:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ0MCwiaWRlbiI6IjM2NTU5NTM1NTg1MDYwNDU1NSIsIm1kIjp7fSwidHMiOjE1MzM5MTk4MTAzODh9.pP960WHJcU-Cv3IRa090VkpT7bPfu422GffYM5IN2-k'
          }
        })
        .then(response => {
          this.nomeClan = response.data.name
          this.logoClan = response.data.badge.image
          this.qtdClan = response.data.memberCount
          this.descClan = response.data.description
          this.numTro = response.data.requiredScore
          this.numTroTotal = response.data.score
          var dataMembros = response.data.members
          dataMembros = JSON.stringify(dataMembros)
          dataMembros = JSON.parse(dataMembros)
          this.membros = dataMembros
        })
        .catch(error => {
          console.log('error 3 ' + error)
        })
    }
  }
}
</script>
<style>
body {
  background-color: #fc5c65;
  background-image: url("../static/fundo-clash.jpg");
  /* Full height */
  height: 100%;
  /* Center and scale the image nicely */
  background-position: top center;
  background-repeat: no-repeat;
  background-size: cover;
  /*text-align: center; */
}
.debug {
  background-color: #fc5c65;
}
</style>
