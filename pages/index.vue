<template>
  <div class="p-2">
    <button @click="updateTable()">確定</button>
    <table>
      <thead>
        <tr>
          <th class="border border-black"></th>
          <th class="border border-black">
            <input
              v-model="pokemon1"
              type="text"
              placeholder="pokemon"
              class="outline-none"
            />
          </th>
          <th class="border border-black">
            <input
              v-model="pokemon2"
              type="text"
              placeholder="pokemon"
              class="outline-none"
            />
          </th>
          <th class="border border-black">
            <input
              v-model="pokemon3"
              type="text"
              placeholder="pokemon"
              class="outline-none"
            />
          </th>
          <th class="border border-black">
            <input
              v-model="pokemon4"
              type="text"
              placeholder="pokemon"
              class="outline-none"
            />
          </th>
          <th class="border border-black">
            <input
              v-model="pokemon5"
              type="text"
              placeholder="pokemon"
              class="outline-none"
            />
          </th>
          <th class="border border-black">
            <input
              v-model="pokemon6"
              type="text"
              placeholder="pokemon"
              class="outline-none"
            />
          </th>
          <th class="border border-black">合計</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="pokemon in pokemonList"
          :key="pokemon.id"
          class="border border-black"
        >
          <td class="border border-black">{{ pokemon.name }}</td>
          <td class="border border-black">{{ compatibility1(pokemon) }}</td>
          <td class="border border-black">{{ compatibility2(pokemon) }}</td>
          <td class="border border-black">{{ compatibility3(pokemon) }}</td>
          <td class="border border-black">{{ compatibility4(pokemon) }}</td>
          <td class="border border-black">{{ compatibility5(pokemon) }}</td>
          <td class="border border-black">{{ compatibility6(pokemon) }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>フッタセル1</td>
          <td>フッタセル2</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pokemon1: '',
      pokemon2: '',
      pokemon3: '',
      pokemon4: '',
      pokemon5: '',
      pokemon6: '',
      p1: '',
      p2: '',
      p3: '',
      p4: '',
      p5: '',
      p6: '',
      pokemonList: [
        {
          id: '00140872-80df-4bd8-bf9e-b182323ea665',
          name: 'フライゴン',
          type1: 'じめん',
          type2: 'ドラゴン',
          weaks: ['こおり', 'ドラゴン', 'フェアリー']
        },
        {
          id: '025c3b5e-30a5-490d-8b77-24a5813caaf9',
          name: 'ニンフィア',
          type1: 'フェアリー',
          type2: null,
          weaks: ['どく', 'はがね']
        },
        {
          id: '04348fa1-4b27-47d8-9dbd-42b222b5ad79',
          name: 'ジャラランガ',
          type1: 'かくとう',
          type2: 'ドラゴン',
          weaks: ['こおり', 'ひこう', 'エスパー', 'ドラゴン', 'フェアリー']
        },
        {
          id: '04a7c71f-2e5e-4fb6-b249-6231a505a469',
          name: 'デスカーン',
          type1: 'ゴースト',
          type2: null,
          weaks: ['ゴースト', 'あく']
        },
        {
          id: '07592851-333c-4851-9d65-7b18d875a130',
          name: 'カットロトム',
          type1: 'くさ',
          type2: 'でんき',
          weaks: ['ほのお', 'こおり', 'どく', 'むし']
        },
        {
          id: '0764ccb7-750b-4c64-864d-ebd55a53cd5b',
          name: 'ガラルマッギョ',
          type1: 'じめん',
          type2: 'はがね',
          weaks: ['ほのお', 'みず', 'かくとう', 'じめん']
        },
        {
          id: '07e63725-d7ec-47aa-85ce-993bd07c2d2c',
          name: 'ゴルーグ',
          type1: 'じめん',
          type2: 'ゴースト',
          weaks: ['みず', 'くさ', 'こおり', 'ゴースト', 'あく']
        },
        {
          id: '082bc3a4-20a1-4dc7-b570-0aa307e88690',
          name: 'ゴロンダ',
          type1: 'かくとう',
          type2: 'あく',
          weaks: ['かくとう', 'ひこう', 'フェアリー']
        }
      ],
      list: [
        {
          id: 1,
          name: 'test'
        },
        {
          id: 2,
          name: 'sample'
        }
      ]
    }
  },
  async created() {
    // 一旦ハードコーディングで対応
    // this.pokemonList = await this.$axios.$get('http://localhost:8080/pokemon')
  },
  methods: {
    updateTable() {
      this.p1 = this.pokemon1
      this.p2 = this.pokemon2
      this.p3 = this.pokemon3
      this.p4 = this.pokemon4
      this.p5 = this.pokemon5
      this.p6 = this.pokemon6
    },
    compatibility1(pokemon) {
      return this.baseCompatibility(pokemon, this.p1)
    },
    compatibility2(pokemon) {
      return this.baseCompatibility(pokemon, this.p2)
    },
    compatibility3(pokemon) {
      return this.baseCompatibility(pokemon, this.p3)
    },
    compatibility4(pokemon) {
      return this.baseCompatibility(pokemon, this.p4)
    },
    compatibility5(pokemon) {
      return this.baseCompatibility(pokemon, this.p5)
    },
    compatibility6(pokemon) {
      return this.baseCompatibility(pokemon, this.p6)
    },
    baseCompatibility(pokemon, p) {
      if (p === '') return ''
      const filter = this.pokemonList.filter((item) => {
        return item.name === p
      })
      if (filter.length === 0) return ''
      const attack1 = pokemon.weaks.indexOf(filter[0].type1)
      let attack2 = ''
      if (attack1 === -1 && filter[0].type2) {
        attack2 = pokemon.weaks.indexOf(filter[0].type2)
      }
      const defense1 = filter[0].weaks.indexOf(pokemon.type1)
      let defense2 = ''
      if (defense1 === -1 && pokemon.type2) {
        defense2 = filter[0].weaks.indexOf(pokemon.type2)
      }
      if (attack2 !== '') {
        if (defense2 !== '') {
          if (attack2 >= 0 && defense2 < 0) {
            return '○'
          } else if (attack2 < 0 && defense2 >= 0) {
            return '×'
          } else {
            return '-'
          }
        } else if (attack2 >= 0 && defense1 < 0) {
          return '○'
        } else if (attack2 < 0 && defense1 >= 0) {
          return '×'
        } else {
          return '-'
        }
      } else if (defense2 !== '') {
        if (attack1 >= 0 && defense2 < 0) {
          return '○'
        } else if (attack1 < 0 && defense2 >= 0) {
          return '×'
        } else {
          return '-'
        }
      } else if (attack1 >= 0 && defense1 < 0) {
        return '○'
      } else if (attack1 < 0 && defense1 >= 0) {
        return '×'
      } else {
        return '-'
      }
    }
  }
}
</script>
