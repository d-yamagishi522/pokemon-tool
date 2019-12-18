<template>
  <div class="p-2">
    <button
      @click="updateTable()"
      @keydown.prevent.shift.exact="movePrev($event)"
      @keydown.prevent.left.exact="movePrev($event)"
      @keydown.prevent.right.exact="moveNext($event)"
      @keydown.prevent.tab.exact="moveNext($event)"
      class="input-item"
    >
      確定
    </button>
    <table class="table">
      <thead>
        <tr>
          <th class="border border-black w-40"></th>
          <th class="border border-black w-40">
            <SuggestInput
              :list="suggestList"
              v-model="pokemon1"
              @input="filterList"
              @setName="setPokemon1"
              @tab="moveNext"
              @shift="movePrev"
            />
          </th>
          <th class="border border-black w-40">
            <SuggestInput
              :list="suggestList"
              v-model="pokemon2"
              @input="filterList"
              @setName="setPokemon2"
              @tab="moveNext"
              @shift="movePrev"
            />
          </th>
          <th class="border border-black w-40">
            <SuggestInput
              :list="suggestList"
              v-model="pokemon3"
              @input="filterList"
              @setName="setPokemon3"
              @tab="moveNext"
              @shift="movePrev"
            />
          </th>
          <th class="border border-black w-40">
            <SuggestInput
              :list="suggestList"
              v-model="pokemon4"
              @input="filterList"
              @setName="setPokemon4"
              @tab="moveNext"
              @shift="movePrev"
            />
          </th>
          <th class="border border-black w-40">
            <SuggestInput
              :list="suggestList"
              v-model="pokemon5"
              @input="filterList"
              @setName="setPokemon5"
              @tab="moveNext"
              @shift="movePrev"
            />
          </th>
          <th class="border border-black w-40">
            <SuggestInput
              :list="suggestList"
              v-model="pokemon6"
              @input="filterList"
              @setName="setPokemon6"
              @tab="moveNext"
              @shift="movePrev"
            />
          </th>
          <th class="border border-black">合計</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="pokemon in pokemonList"
          :key="pokemon.id"
          :class="{
            'bg-red-200': total(pokemon) === 0,
            'bg-yellow-200': total(pokemon) === 1,
            'bg-teal-300': total(pokemon) >= 2
          }"
          class="border border-black"
        >
          <td class="border border-black">{{ pokemon.name }}</td>
          <td class="border border-black">{{ compatibility1(pokemon) }}</td>
          <td class="border border-black">{{ compatibility2(pokemon) }}</td>
          <td class="border border-black">{{ compatibility3(pokemon) }}</td>
          <td class="border border-black">{{ compatibility4(pokemon) }}</td>
          <td class="border border-black">{{ compatibility5(pokemon) }}</td>
          <td class="border border-black">{{ compatibility6(pokemon) }}</td>
          <td class="border border-black">{{ total(pokemon) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SuggestInput from '@/components/SuggestInput.vue'

export default {
  components: {
    SuggestInput
  },
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
      suggestList: []
    }
  },
  computed: {
    elements() {
      return document.getElementsByClassName('input-item')
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
    total(pokemon) {
      if (this.p1 === '') return ''
      let num = 0
      if (this.compatibility1(pokemon) === '○') num++
      if (this.compatibility2(pokemon) === '○') num++
      if (this.compatibility3(pokemon) === '○') num++
      if (this.compatibility4(pokemon) === '○') num++
      if (this.compatibility5(pokemon) === '○') num++
      if (this.compatibility6(pokemon) === '○') num++
      return num
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
    },
    filterList(text) {
      this.suggestList = this.pokemonList.filter((item) => {
        return this.katakanaToHiragana(item.name).includes(
          this.katakanaToHiragana(text)
        )
      })
    },
    katakanaToHiragana(text) {
      return text.replace(/[\u30A1-\u30F6]/g, (match) => {
        const character = match.charCodeAt(0) - 0x60
        return String.fromCharCode(character)
      })
    },
    setPokemon1(name) {
      this.pokemon1 = name
    },
    setPokemon2(name) {
      this.pokemon2 = name
    },
    setPokemon3(name) {
      this.pokemon3 = name
    },
    setPokemon4(name) {
      this.pokemon4 = name
    },
    setPokemon5(name) {
      this.pokemon5 = name
    },
    setPokemon6(name) {
      this.pokemon6 = name
    },
    findIndex(target) {
      return [].findIndex.call(this.elements, (e) => e === target)
    },
    moveFocus(index) {
      if (this.elements[index]) {
        this.elements[index].focus()
      }
    },
    moveNext(event) {
      const index = this.findIndex(event.target)
      if (index === 6) {
        this.moveFocus(0)
        return
      }
      this.moveFocus(index + 1)
    },
    movePrev(event) {
      const index = this.findIndex(event.target)
      if (index === 0) {
        this.moveFocus(6)
        return
      }
      this.moveFocus(index - 1)
    }
  }
}
</script>

<style scoped>
.table {
  width: 1250px;
}
</style>
