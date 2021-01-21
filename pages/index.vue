<template>
  <div class="p-2">
    <h1 class="font-bold text-4xl">ポケモンパーティ構築支援ツール</h1>
    <ul class="py-4 font-bold">
      <li class="list-disc ml-4">
        タイプ相性のみの優劣で表示されます (○: 有利、-: 普通、 ×: 不利)
      </li>
      <li class="list-disc ml-4">
        合計には列の丸の数が表示されます
      </li>
      <li class="list-disc ml-4">
        使用率の低いポケモンは登録されていません
      </li>
    </ul>
    <button
      @click="updateTable()"
      @keydown.prevent.shift.exact="movePrev($event)"
      @keydown.prevent.left.exact="movePrev($event)"
      @keydown.prevent.right.exact="moveNext($event)"
      @keydown.prevent.tab.exact="moveNext($event)"
      class="input-item border bg-gray-900 px-2 py-1 text-white font-bold mb-2"
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
              @right="moveNext"
              @left="movePrev"
              @Backspace="pokemon1 = ''"
            />
          </th>
          <th class="border border-black w-40">
            <SuggestInput
              :list="suggestList"
              v-model="pokemon2"
              @input="filterList"
              @setName="setPokemon2"
              @right="moveNext"
              @left="movePrev"
              @Backspace="pokemon2 = ''"
            />
          </th>
          <th class="border border-black w-40">
            <SuggestInput
              :list="suggestList"
              v-model="pokemon3"
              @input="filterList"
              @setName="setPokemon3"
              @right="moveNext"
              @left="movePrev"
              @Backspace="pokemon3 = ''"
            />
          </th>
          <th class="border border-black w-40">
            <SuggestInput
              :list="suggestList"
              v-model="pokemon4"
              @input="filterList"
              @setName="setPokemon4"
              @right="moveNext"
              @left="movePrev"
              @Backspace="pokemon4 = ''"
            />
          </th>
          <th class="border border-black w-40">
            <SuggestInput
              :list="suggestList"
              v-model="pokemon5"
              @input="filterList"
              @setName="setPokemon5"
              @right="moveNext"
              @left="movePrev"
              @Backspace="pokemon5 = ''"
            />
          </th>
          <th class="border border-black w-40">
            <SuggestInput
              :list="suggestList"
              v-model="pokemon6"
              @input="filterList"
              @setName="setPokemon6"
              @right="moveNext"
              @left="movePrev"
              @Backspace="pokemon6 = ''"
            />
          </th>
          <th class="border border-black">合計</th>
        </tr>
      </thead>
      <tbody class="text-center">
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
          <td class="border border-black text-left">{{ pokemon.name }}</td>
          <td class="border border-black">{{ compatibility(pokemon, p1) }}</td>
          <td class="border border-black">{{ compatibility(pokemon, p2) }}</td>
          <td class="border border-black">{{ compatibility(pokemon, p3) }}</td>
          <td class="border border-black">{{ compatibility(pokemon, p4) }}</td>
          <td class="border border-black">{{ compatibility(pokemon, p5) }}</td>
          <td class="border border-black">{{ compatibility(pokemon, p6) }}</td>
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
  head() {
    return {
      title: 'パーティ構築支援ツール'
    }
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
      pokemonList: [],
      suggestList: []
    }
  },
  computed: {
    elements() {
      return document.getElementsByClassName('input-item')
    }
  },
  async created() {
    this.pokemonList = await this.$axios.$get(
      'https://calm-reaches-54518.herokuapp.com/pokemon'
    )
  },
  methods: {
    updateTable() {
      this.p1 = this.pokemon1.trim()
      this.p2 = this.pokemon2.trim()
      this.p3 = this.pokemon3.trim()
      this.p4 = this.pokemon4.trim()
      this.p5 = this.pokemon5.trim()
      this.p6 = this.pokemon6.trim()
    },
    total(pokemon) {
      if (this.p1 === '') return ''
      let num = 0
      if (this.compatibility(pokemon, this.p1) === '○') num++
      if (this.compatibility(pokemon, this.p2) === '○') num++
      if (this.compatibility(pokemon, this.p3) === '○') num++
      if (this.compatibility(pokemon, this.p4) === '○') num++
      if (this.compatibility(pokemon, this.p5) === '○') num++
      if (this.compatibility(pokemon, this.p6) === '○') num++
      return num
    },
    compatibility(pokemon, p) {
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
