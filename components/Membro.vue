<template>
    <div>
        <div class="card">
            <img class="card-img-top mx-auto" :src="badge" alt="Card image cap" style="width: 30px;">
            <div class="card-body">
                <h5 class="card-title text-center">{{nome}}</h5>
                <hr>
                <p class="text-center">Poder: {{traduzPoder}}</p>
                <hr>
                <p class="text-center">Nível Atual: <span class="badge badge-danger">{{qtdExp}}</span></p>
                <hr>
                <p class="text-center"><img src="https://royaleapi.com/static/img/ui/trophy.png" style="width:30px; display: inline;">{{qtdTro}}</p>
                <hr>
                <p class="text-center">Arena atual : <span class="badge badge-info">{{arena}}</span></p>
            </div>
            <div class="card-footer text-center">
                <nuxt-link class="btn btn-outline-primary" :to="{name: 'perfil-id', params: { id:linkPerfil } }">Visualizar perfil</nuxt-link>
            </div>
        </div>
    </div>

</template>
<script>

export default {
  components: {

  },
  props: ['badge', 'nome', 'patente', 'qtdExp', 'qtdTro', 'arena', 'linkPerfil'],
  data: function () {
    return {
      dados: ''
    }
  },
  computed: {
    traduzPoder: function () {
      if (this.patente === 'leader') {
        return 'Líder'
      } else if (this.patente === 'coLeader') {
        return 'Sub-Líder'
      } else if (this.patente === 'elder'){
        return 'Ancião'
      }else{
        return 'Membro'
      }
    }
  },
  methods: {
    salvaUrl: function (url) {
      this.$store.commit('saveUrl', url)
      console.log('Dados do $store ' + this.$store.getters.getUrl)
    }
  }
}
</script>
