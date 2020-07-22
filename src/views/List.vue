<template>
  <section id="list">
    <el-container>
      <el-header>
        <el-row :gutter="10">
          <el-col :span="12" >
            <h1>Lista de Pessoas</h1>
          </el-col>
          <el-col :span="12" class="text-right">
            <el-button type="primary" @click="toCreate" >Nova Pessoa</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table
          ref="table"
          :data="pessoas"
          empty-text="Sem dados"
          v-loading="loading"
          border
          stripe
          >
          <el-table-column
            prop="nome"
            label="Nome"
            width="180">
          </el-table-column>
          <el-table-column
            prop="idade"
            label="Idade"
            width="180">
          </el-table-column>
          <el-table-column
            prop="profissao"
            label="Profissao">
          </el-table-column>
          <el-table-column align="center" fixed="right" width="180" >
            <template slot-scope="scope">
              <el-button
                circle
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="handleEdit(scope.row)"
              />
              <el-button
                circle
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </section>
</template>

<script>
export default {
  data () {
    return {
      pessoas: [],
      loading: true
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.loading = true
      this.$db.collection('pessoas').get().then(
        snapshot => {
          this.pessoas = snapshot.docs.map(el => ({ id: el.id, ...el.data() }))
        }
      ).finally(
        () => {
          this.loading = false
        }
      )
    },
    toCreate () {
      this.$router.push('/edit')
    },
    handleEdit (item) {
      this.$router.push(`/edit/${item.id}`)
    },
    handleDelete (item) {
      console.log({ ...item })
      this.$confirm('Este registro será apagado permanentemente. Consituar?', 'Danger', {
        confirmButtonText: 'Apagar',
        cancelButtonText: 'Cancelar',
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.$db.collection('pessoas').doc(item.id).delete().then(
          () => {
            this.$message({
              type: 'success',
              message: 'Apagado!'
            })
            this.init()
          }
        )
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#list {
  .el-container {
    padding-top: 1rem;
  }
}
</style>
