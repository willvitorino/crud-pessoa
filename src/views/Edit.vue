<template>
  <section id="edit">
    <el-container>
      <el-header>
        <el-row :gutter="10">
          <el-col :span="12" >
            <h1>Pessoa</h1>
          </el-col>
          <el-col :span="12" class="text-right" >
            <el-button type="success" v-text="'Salvar'" @click="handleSave" />
            <el-button type="warning" v-text="'Cancelar'" @click="handleCancel" />
            <el-button v-if="state.id" circle type="danger" icon="el-icon-delete" @click="handleDelete" />
          </el-col>
        </el-row>
        <div>
        </div>
      </el-header>
      <el-main>
        <el-form ref="form" :model="state">
          <el-form-item >
            <el-row :gutter="20">
              <el-col :span="12">
                Nome:
              </el-col>
              <el-col :span="12">
                Idade:
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-input label="Nome:" v-model="state.nome" placeholder="Nome" clearable></el-input>
              </el-col>
              <el-col :span="12" >
                <el-input-number class="el-input text-left" v-model="state.idade" placeholder="Idade" controls-position="right"></el-input-number>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item >
            <el-row :gutter="20">
              <el-col :span="12">
                Profissão:
              </el-col>
              <el-col :span="12">
                Email:
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-input v-model="state.profissao" placeholder="Profissão" clearable></el-input>
              </el-col>
              <el-col :span="12">
                <el-input label="E-mail" v-model="state.email" placeholder="E-mail" clearable></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </section>
</template>

<script>
export default {
  data () {
    return {
      state: {
        nome: '',
        email: '',
        idade: 18,
        profissao: ''
      }
    }
  },
  mounted () {
    const { id } = this.$route.params
    if (id) {
      this.init(id)
    }
  },
  methods: {
    init (id) {
      this.$db.collection('pessoas').doc(id).get().then(
        snapshot => {
          this.state = {
            id: snapshot.id,
            ...snapshot.data()
          }
        }
      )
    },
    handleSave () {
      this.$db.collection('pessoas').add({ ...this.state }).then(
        () => {
          this.$message({
            title: 'Success',
            message: 'Salvo com sucesso!',
            type: 'success'
          })
          this.handleCancel()
        }
      )
    },
    handleCancel () {
      this.$router.push('/list')
    },
    handleDelete () {
      this.$confirm('Este registro será apagado permanentemente. Consituar?', 'Danger', {
        confirmButtonText: 'Apagar',
        cancelButtonText: 'Cancelar',
        type: 'warning'
      }).then(() => {
        this.$db.collection('pessoas').doc(this.state.id).delete().then(
          () => {
            this.$message({
              type: 'success',
              message: 'Apagado!'
            })
            this.handleCancel()
          }
        )
      }).catch(() => {
        this.$message({ type: 'info', message: 'Cancelado!' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  #edit {
    .el-container {
      padding-top: 1rem;
    }
  }
</style>
