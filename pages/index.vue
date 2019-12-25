<template>
  <div class="p-2">
    <h1 class="font-bold text-4xl">ポケモンパーティ構築支援ツール</h1>
    <div class="py-4 font-bold">
      <p>・ タイプ相性のみの優劣で表示されます (○: 有利、-: 普通、 ×: 不利)</p>
      <p>・ 合計には列の丸の数が表示されます</p>
      <p>・ 使用率の低いポケモンは登録されていません</p>
    </div>
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
      pokemonList: [
        {
          id: 'f8f211f0-81f6-417f-866f-6142b1fee99b',
          name: 'ミミッキュ',
          type1: 'ゴースト',
          type2: 'フェアリー',
          weaks: ['ゴースト', 'はがね']
        },
        {
          id: 'c2835a2a-a9e4-4b9b-9c6e-d1bc4979fcbf',
          name: 'ドリュウズ',
          type1: 'じめん',
          type2: 'はがね',
          weaks: ['ほのお', 'みず', 'かくとう', 'じめん']
        },
        {
          id: 'fa85a98d-a7fd-4600-aff4-41cce9588f56',
          name: 'ドラパルト',
          type1: 'ゴースト',
          type2: 'ドラゴン',
          weaks: ['こおり', 'ゴースト', 'ドラゴン', 'あく', 'フェアリー']
        },
        {
          id: 'fe75cf44-a6d5-4771-9544-401da2fa18d3',
          name: 'アーマーガア',
          type1: 'ひこう',
          type2: 'はがね',
          weaks: ['ほのお', 'でんき']
        },
        {
          id: 'c81bab22-f182-4189-a735-8124d3f97e36',
          name: 'バンギラス',
          type1: 'いわ',
          type2: 'あく',
          weaks: [
            'みず',
            'くさ',
            'かくとう',
            'じめん',
            'むし',
            'はがね',
            'フェアリー'
          ]
        },
        {
          id: '77185f2d-86ed-454d-9f16-f7de2027dec9',
          name: 'サザンドラ',
          type1: 'ドラゴン',
          type2: 'あく',
          weaks: ['こおり', 'かくとう', 'むし', 'ドラゴン', 'フェアリー']
        },
        {
          id: '6630a4b7-0263-4551-a208-b0cd09204ec1',
          name: 'トゲキッス',
          type1: 'ひこう',
          type2: 'フェアリー',
          weaks: ['でんき', 'こおり', 'どく', 'いわ', 'はがね']
        },
        {
          id: '0ac70058-b64d-4cf3-b30d-0da23dddb97d',
          name: 'ウォッシュロトム',
          type1: 'みず',
          type2: 'でんき',
          weaks: ['くさ', 'じめん']
        },
        {
          id: 'd2f6e9b3-82c6-4f3c-b878-8a0805d08b94',
          name: 'ヒートロトム',
          type1: 'ほのお',
          type2: 'でんき',
          weaks: ['みず', 'じめん', 'いわ']
        },
        {
          id: '90a8d1d6-0e0d-4a9f-a63a-88c1e44eb74f',
          name: 'ギャラドス',
          type1: 'みず',
          type2: 'ひこう',
          weaks: ['でんき', 'いわ']
        },
        {
          id: '3992df26-179d-4f6d-b3c7-01e00b3f3212',
          name: 'オーロンゲ',
          type1: 'あく',
          type2: 'フェアリー',
          weaks: ['どく', 'はがね', 'フェアリー']
        },
        {
          id: '025c3b5e-30a5-490d-8b77-24a5813caaf9',
          name: 'ニンフィア',
          type1: 'フェアリー',
          type2: null,
          weaks: ['どく', 'はがね']
        },
        {
          id: '1981290a-e4b6-4f7e-9ee3-1ced0a9ca359',
          name: 'ガラルヒヒダルマ',
          type1: 'こおり',
          type2: null,
          weaks: ['ほのお', 'かくとう', 'いわ', 'はがね']
        },
        {
          id: '54a7c0e7-885f-4e8e-92fe-59bd8ddadcc2',
          name: 'リザードン',
          type1: 'ほのお',
          type2: 'ひこう',
          weaks: ['みず', 'でんき', 'いわ']
        },
        {
          id: '0c702f8c-7a84-4552-b21e-76434f0341ae',
          name: 'ナットレイ',
          type1: 'くさ',
          type2: 'はがね',
          weaks: ['ほのお', 'かくとう']
        },
        {
          id: 'e482dd5e-a905-4ae6-a97d-b8ab4827a748',
          name: 'ドヒドイデ',
          type1: 'みず',
          type2: 'どく',
          weaks: ['でんき', 'じめん', 'エスパー']
        },
        {
          id: 'cca2247d-39e4-4710-a7af-886f80f3122c',
          name: 'パルシェン',
          type1: 'みず',
          type2: 'こおり',
          weaks: ['くさ', 'でんき', 'かくとう', 'いわ']
        },
        {
          id: 'efc65c97-d605-440b-a404-ba0ee0a647f1',
          name: 'ガラルサニーゴ',
          type1: 'ゴースト',
          type2: null,
          weaks: ['ゴースト', 'あく']
        },
        {
          id: 'ea6a6007-40cc-47fc-ae09-63cb7b331363',
          name: 'アイアント',
          type1: 'むし',
          type2: 'はがね',
          weaks: ['ほのお']
        },
        {
          id: 'ca023531-0121-4cf3-8345-3f1d01af335b',
          name: 'エースバーン',
          type1: 'ほのお',
          type2: null,
          weaks: ['みず', 'じめん', 'いわ']
        },
        {
          id: 'ace97de5-e855-42ae-96b7-4c68d5dcb99b',
          name: 'ブラッキー',
          type1: 'あく',
          type2: null,
          weaks: ['かくとう', 'むし', 'フェアリー']
        },
        {
          id: '1bf84a8d-2a0a-4369-b8ca-07bf52c8d03b',
          name: 'ウインディ',
          type1: 'ほのお',
          type2: null,
          weaks: ['みず', 'じめん', 'いわ']
        },
        {
          id: 'cde790f8-07fe-4ef2-8568-1241f05b9919',
          name: 'ジュラルドン',
          type1: 'ドラゴン',
          type2: 'はがね',
          weaks: ['かくとう', 'じめん']
        },
        {
          id: '7d089493-c64e-4fa4-92c6-19034c0cf310',
          name: 'ヌオー',
          type1: 'みず',
          type2: 'じめん',
          weaks: ['くさ']
        },
        {
          id: 'cadb5595-86ba-4318-8b4c-73c124f32a13',
          name: 'カバルドン',
          type1: 'じめん',
          type2: null,
          weaks: ['みず', 'くさ', 'こおり']
        },
        {
          id: '46df8cf3-2b33-477c-b8e7-143ea975078f',
          name: 'カビゴン',
          type1: 'ノーマル',
          type2: null,
          weaks: ['かくとう']
        },
        {
          id: '3bd8e5e0-fed0-45d3-bd10-ee6f4faf8e62',
          name: 'ギルガルド',
          type1: 'ゴースト',
          type2: 'はがね',
          weaks: ['ほのお', 'じめん', 'ゴースト', 'あく']
        },
        {
          id: 'bec88041-86b9-4a41-bff7-85c9fd2f7302',
          name: 'オノノクス',
          type1: 'ドラゴン',
          type2: null,
          weaks: ['こおり', 'ドラゴン', 'フェアリー']
        },
        {
          id: '531205fd-9bdc-4885-97e2-441a87e1bcb1',
          name: 'ウオノラゴン',
          type1: 'みず',
          type2: 'ドラゴン',
          weaks: ['ドラゴン', 'フェアリー']
        },
        {
          id: 'ee46d662-3075-4be5-97af-46777cce91ea',
          name: 'パッチラゴン',
          type1: 'でんき',
          type2: 'ドラゴン',
          weaks: ['こおり', 'じめん', 'ドラゴン', 'フェアリー']
        },
        {
          id: '4ce0b088-b80c-46aa-b64c-807c885de3db',
          name: 'ネギガナイト',
          type1: 'かくとう',
          type2: null,
          weaks: ['ひこう', 'エスパー', 'フェアリー']
        },
        {
          id: '4d2f2fd9-8725-4b3a-bbc5-719022061840',
          name: 'ドラピオン',
          type1: 'どく',
          type2: 'あく',
          weaks: ['じめん']
        },
        {
          id: '4e894aee-54bb-45f3-912a-6be84e53d10a',
          name: 'マニューラ',
          type1: 'こおり',
          type2: 'あく',
          weaks: ['ほのお', 'かくとう', 'むし', 'いわ', 'はがね', 'フェアリー']
        },
        {
          id: '506c86ee-fe70-4856-bb34-166b135a5e9a',
          name: 'ガメノデス',
          type1: 'みず',
          type2: 'いわ',
          weaks: ['くさ', 'でんき', 'かくとう', 'じめん']
        },
        {
          id: '52a49909-7a60-4b96-ad56-1d87e775727b',
          name: 'バルジーナ',
          type1: 'ひこう',
          type2: 'あく',
          weaks: ['でんき', 'こおり', 'いわ', 'フェアリー']
        },
        {
          id: '54b9fc4e-840b-4e05-ae9c-d2be2b44e984',
          name: 'ガラルマタドガス',
          type1: 'どく',
          type2: 'フェアリー',
          weaks: ['じめん', 'エスパー', 'はがね']
        },
        {
          id: '5691d340-6147-450d-bb80-d44f644714ad',
          name: 'シャワーズ',
          type1: 'みず',
          type2: null,
          weaks: ['くさ', 'でんき']
        },
        {
          id: '57281b8f-330f-4d29-8047-905c67dc3194',
          name: 'ドータクン',
          type1: 'エスパー',
          type2: 'はがね',
          weaks: ['ほのお', 'じめん', 'ゴースト', 'あく']
        },
        {
          id: '5959d117-b13e-4a3c-bf5a-103b3da25d5d',
          name: 'ズルズキン',
          type1: 'かくとう',
          type2: 'あく',
          weaks: ['かくとう', 'ひこう', 'フェアリー']
        },
        {
          id: '59f83115-3405-4cfc-bdb5-67973bc91b6e',
          name: 'ストリンダー',
          type1: 'でんき',
          type2: 'どく',
          weaks: ['じめん', 'エスパー']
        },
        {
          id: '5a783b23-fdce-4ac8-9834-bb1ce241e2ae',
          name: 'ポットデス',
          type1: 'ゴースト',
          type2: null,
          weaks: ['ゴースト', 'あく']
        },
        {
          id: '5e87c549-ad28-4b52-a406-9d6c68d92b2c',
          name: 'ゲンガー',
          type1: 'どく',
          type2: 'ゴースト',
          weaks: ['じめん', 'エスパー', 'ゴースト', 'あく']
        },
        {
          id: '5edae7d0-b84f-4df0-aa77-920bf1debf92',
          name: 'サーナイト',
          type1: 'エスパー',
          type2: 'フェアリー',
          weaks: ['どく', 'ゴースト', 'はがね']
        },
        {
          id: '605e5fed-2ec3-497f-a69a-4b5b05ad2373',
          name: 'ホルード',
          type1: 'ノーマル',
          type2: 'じめん',
          weaks: ['みず', 'くさ', 'こおり', 'かくとう']
        },
        {
          id: '608ae62a-477f-45f8-ac82-735d5063337b',
          name: 'サンダース',
          type1: 'でんき',
          type2: null,
          weaks: ['じめん']
        },
        {
          id: '62d2575c-d3f1-4221-b838-ed50f33fd97f',
          name: 'スピンロトム',
          type1: 'でんき',
          type2: 'ひこう',
          weaks: ['こおり', 'いわ']
        },
        {
          id: '630545ac-b378-4948-a2cc-232b87987ca9',
          name: 'デスバーン',
          type1: 'じめん',
          type2: 'ゴースト',
          weaks: ['みず', 'くさ', 'こおり', 'ゴースト', 'あく']
        },
        {
          id: '6574df46-d766-4be0-a79c-f10f8bae8367',
          name: 'ランターン',
          type1: 'みず',
          type2: 'でんき',
          weaks: ['くさ', 'じめん']
        },
        {
          id: '6a02e03e-30ca-464c-81d3-494e3cdb11e9',
          name: 'スカタンク',
          type1: 'どく',
          type2: 'あく',
          weaks: ['じめん']
        },
        {
          id: '6bde063b-d78b-4791-a6ea-4f2c90de5059',
          name: 'シンボラー',
          type1: 'ひこう',
          type2: 'エスパー',
          weaks: ['でんき', 'こおり', 'いわ', 'ゴースト', 'あく']
        },
        {
          id: '6c3a6316-f7e8-4e3e-b676-dde463399d59',
          name: 'タチフサグマ',
          type1: 'ノーマル',
          type2: 'あく',
          weaks: ['かくとう', 'むし', 'フェアリー']
        },
        {
          id: '6ef79213-8d09-48a9-bd19-48e289193af9',
          name: 'パンプジン',
          type1: 'くさ',
          type2: 'ゴースト',
          weaks: ['ほのお', 'こおり', 'ひこう', 'ゴースト', 'あく']
        },
        {
          id: '80b694ab-e49c-4d11-800c-ce1deed87a82',
          name: 'バタフリー',
          type1: 'ひこう',
          type2: 'むし',
          weaks: ['ほのお', 'でんき', 'こおり', 'ひこう', 'いわ']
        },
        {
          id: '83c5f0d8-854a-4a78-af20-d3cffb5e2394',
          name: 'ユキメノコ',
          type1: 'こおり',
          type2: 'ゴースト',
          weaks: ['ほのお', 'いわ', 'ゴースト', 'あく', 'はがね']
        },
        {
          id: '84f021c9-ab77-461b-80ae-96edf4fb4567',
          name: 'ココロモリ',
          type1: 'ひこう',
          type2: 'エスパー',
          weaks: ['でんき', 'こおり', 'いわ', 'ゴースト', 'あく']
        },
        {
          id: '88d7d77b-1373-49ff-ba18-513fb1375de0',
          name: 'ピクシー',
          type1: 'フェアリー',
          type2: null,
          weaks: ['どく', 'はがね']
        },
        {
          id: '89240025-dc87-4b7e-a33b-b180b9a6bac6',
          name: 'ラフレシア',
          type1: 'くさ',
          type2: 'どく',
          weaks: ['ほのお', 'こおり', 'ひこう', 'エスパー']
        },
        {
          id: '8b66568b-d635-4cb3-bc7b-51625a1dcb11',
          name: 'ギギギアル',
          type1: 'はがね',
          type2: null,
          weaks: ['ほのお', 'かくとう', 'じめん']
        },
        {
          id: '8d6fc3aa-e3a9-4331-9351-c948131bc092',
          name: 'ペリッパー',
          type1: 'みず',
          type2: 'ひこう',
          weaks: ['でんき', 'いわ']
        },
        {
          id: '8f3487f7-f245-47cc-b363-76ea13dbd4b4',
          name: 'マルヤクデ',
          type1: 'ほのお',
          type2: 'むし',
          weaks: ['みず', 'ひこう', 'いわ']
        },
        {
          id: '8f34b13b-99a3-4308-b493-6def4204afbd',
          name: 'オンバーン',
          type1: 'ひこう',
          type2: 'ドラゴン',
          weaks: ['こおり', 'いわ', 'ドラゴン', 'フェアリー']
        },
        {
          id: '92c07146-a30b-4c59-82d4-df97e303ffee',
          name: 'ドサイドン',
          type1: 'じめん',
          type2: 'いわ',
          weaks: ['みず', 'くさ', 'こおり', 'かくとう', 'じめん', 'はがね']
        },
        {
          id: '98c91a82-e550-4f13-aee1-4da2d14ce87f',
          name: 'オニシズクモ',
          type1: 'みず',
          type2: 'むし',
          weaks: ['でんき', 'ひこう', 'いわ']
        },
        {
          id: '99732dde-ca39-4b07-8526-1b90ed24fb8b',
          name: 'ヌメルゴン',
          type1: 'ドラゴン',
          type2: null,
          weaks: ['こおり', 'ドラゴン', 'フェアリー']
        },
        {
          id: '9a16ef20-2c55-4d99-b8f8-3ee76b85d171',
          name: 'エレザード',
          type1: 'ノーマル',
          type2: 'でんき',
          weaks: ['かくとう', 'じめん']
        },
        {
          id: '9b15b3e1-94b0-4a8f-85a3-78b50b290cad',
          name: 'キリキザン',
          type1: 'あく',
          type2: 'はがね',
          weaks: ['ほのお', 'かくとう', 'じめん']
        },
        {
          id: '9c428543-a904-43f1-974d-59be53dd4ad6',
          name: 'ロズレイド',
          type1: 'くさ',
          type2: 'どく',
          weaks: ['ほのお', 'こおり', 'ひこう', 'エスパー']
        },
        {
          id: 'a399af77-e1c1-4dd9-a121-ac7e4eb88b88',
          name: 'ルンパッパ',
          type1: 'みず',
          type2: 'くさ',
          weaks: ['どく', 'ひこう', 'むし']
        },
        {
          id: 'a5945afe-be2b-4e46-bce7-3da763819924',
          name: 'ニャイキング',
          type1: 'はがね',
          type2: null,
          weaks: ['ほのお', 'かくとう', 'じめん']
        },
        {
          id: 'ab1fe650-0aa7-46f9-973b-e0e8fb1ed11a',
          name: 'エンニュート',
          type1: 'ほのお',
          type2: 'どく',
          weaks: ['みず', 'じめん', 'エスパー', 'いわ']
        },
        {
          id: 'ab2ffa3b-6a58-491b-a1c8-8011fdab9f8c',
          name: 'ルチャブル',
          type1: 'かくとう',
          type2: 'ひこう',
          weaks: ['でんき', 'こおり', 'ひこう', 'エスパー', 'フェアリー']
        },
        {
          id: 'ab536bf7-c109-4577-ac25-294715df185d',
          name: 'ゴリランダー',
          type1: 'くさ',
          type2: null,
          weaks: ['ほのお', 'こおり', 'どく', 'ひこう', 'むし']
        },
        {
          id: 'b1296a97-3798-45a2-99fb-d5a96bb21009',
          name: 'オニゴーリ',
          type1: 'こおり',
          type2: null,
          weaks: ['ほのお', 'かくとう', 'いわ', 'はがね']
        },
        {
          id: 'b353c7f6-caf2-4215-a4ef-291348c32ce5',
          name: 'デンチュラ',
          type1: 'でんき',
          type2: 'むし',
          weaks: ['ほのお', 'いわ']
        },
        {
          id: 'b466ab80-8224-4e55-881a-708ed45989df',
          name: 'シュバルゴ',
          type1: 'むし',
          type2: 'はがね',
          weaks: ['ほのお']
        },
        {
          id: 'b6375a73-50ee-4469-ada1-d159d7053a10',
          name: 'ユキノオー',
          type1: 'くさ',
          type2: 'こおり',
          weaks: [
            'ほのお',
            'かくとう',
            'どく',
            'ひこう',
            'むし',
            'いわ',
            'はがね'
          ]
        },
        {
          id: 'ba937871-0fe6-4a60-a238-c86a016ed3a5',
          name: 'フワライド',
          type1: 'ひこう',
          type2: 'ゴースト',
          weaks: ['でんき', 'こおり', 'いわ', 'ゴースト', 'あく']
        },
        {
          id: 'ba9f28e6-bea5-4b79-904e-165034f875d1',
          name: 'ランクルス',
          type1: 'エスパー',
          type2: null,
          weaks: ['むし', 'ゴースト', 'あく']
        },
        {
          id: 'bb5bbfed-3572-416b-aa66-1d0b2b14c45d',
          name: 'バイバニラ',
          type1: 'こおり',
          type2: null,
          weaks: ['ほのお', 'かくとう', 'いわ', 'はがね']
        },
        {
          id: 'bd5886db-ec28-482d-b621-95bb57f376bb',
          name: 'シャンデラ',
          type1: 'ほのお',
          type2: 'ゴースト',
          weaks: ['みず', 'じめん', 'いわ', 'ゴースト', 'あく']
        },
        {
          id: 'bf7c3e54-bc09-4acf-8fd6-76a2fca0a150',
          name: 'ヨノワール',
          type1: 'ゴースト',
          type2: null,
          weaks: ['ゴースト', 'あく']
        },
        {
          id: 'c0655ae7-0cb9-4388-9ae9-e910d34a9faf',
          name: 'ヨクバリス',
          type1: 'ノーマル',
          type2: null,
          weaks: ['かくとう']
        },
        {
          id: 'c148c1f5-9ce5-4d43-9680-4167c4fc3bf9',
          name: 'ライボルト',
          type1: 'でんき',
          type2: null,
          weaks: ['じめん']
        },
        {
          id: 'c1c8e0ed-e630-4a9d-9d4b-251c3e9400f2',
          name: 'エルレイド',
          type1: 'かくとう',
          type2: 'エスパー',
          weaks: ['ひこう', 'ゴースト', 'フェアリー']
        },
        {
          id: 'ccce3d41-3658-4956-bd57-11d304fb32c6',
          name: 'コオリッポ',
          type1: 'こおり',
          type2: null,
          weaks: ['ほのお', 'かくとう', 'いわ', 'はがね']
        },
        {
          id: 'cedda196-f965-4765-a6a3-98f1c678ead3',
          name: 'ダイオウドウ',
          type1: 'はがね',
          type2: null,
          weaks: ['ほのお', 'かくとう', 'じめん']
        },
        {
          id: 'd3ff6421-5d19-4e22-882f-459bc0fdec6b',
          name: 'グレイシア',
          type1: 'こおり',
          type2: null,
          weaks: ['ほのお', 'かくとう', 'いわ', 'はがね']
        },
        {
          id: 'de35a6a7-ff48-48cb-82c1-210b16003b70',
          name: 'ガマゲロゲ',
          type1: 'みず',
          type2: 'じめん',
          weaks: ['くさ']
        },
        {
          id: 'ded6f82a-ac2f-4cc5-8e4a-1ebd36ab8adb',
          name: 'ブルンゲル',
          type1: 'みず',
          type2: 'ゴースト',
          weaks: ['くさ', 'でんき', 'ゴースト', 'あく']
        },
        {
          id: 'e74cb2f1-e871-4b47-8169-816d1abcba97',
          name: 'ロトム',
          type1: 'でんき',
          type2: 'ゴースト',
          weaks: ['じめん', 'ゴースト', 'あく']
        },
        {
          id: 'e8578ada-4955-4a00-b7a8-a942008b075b',
          name: 'パルスワン',
          type1: 'でんき',
          type2: null,
          weaks: ['じめん']
        },
        {
          id: 'e9afd9cd-2b49-4462-869e-20b1b3101154',
          name: 'キュウコン',
          type1: 'ほのお',
          type2: null,
          weaks: ['みず', 'じめん', 'いわ']
        },
        {
          id: 'ec887d64-6852-49b4-a0ed-885101b44dc2',
          name: 'カラマネロ',
          type1: 'エスパー',
          type2: 'あく',
          weaks: ['むし', 'フェアリー']
        },
        {
          id: 'ed822fd9-b396-441e-a450-19567e4b417f',
          name: 'ガラルギャロップ',
          type1: 'エスパー',
          type2: 'フェアリー',
          weaks: ['どく', 'ゴースト', 'はがね']
        },
        {
          id: 'ef7631a6-005e-4b32-92b0-5c209d5f9ee3',
          name: 'タルップル',
          type1: 'くさ',
          type2: 'ドラゴン',
          weaks: ['こおり', 'どく', 'ひこう', 'むし', 'ドラゴン', 'フェアリー']
        },
        {
          id: 'efa33adb-af66-47c3-bce1-aa050212745a',
          name: 'ドクロッグ',
          type1: 'かくとう',
          type2: 'どく',
          weaks: ['じめん', 'ひこう', 'エスパー']
        },
        {
          id: 'efaf923e-b4a6-4608-9679-b7b619295020',
          name: 'コータス',
          type1: 'ほのお',
          type2: null,
          weaks: ['みず', 'じめん', 'いわ']
        },
        {
          id: 'f1a6995a-7088-4571-8f73-b025694cc02b',
          name: 'モルペコ',
          type1: 'でんき',
          type2: 'あく',
          weaks: ['かくとう', 'むし', 'フェアリー']
        },
        {
          id: 'f44c378a-4672-461f-bdb8-297037de6d34',
          name: 'セキタンザン',
          type1: 'ほのお',
          type2: 'いわ',
          weaks: ['みず', 'かくとう', 'じめん', 'いわ']
        },
        {
          id: 'f5c1b645-ae5a-49a6-a886-69dd13fce9ac',
          name: 'アップリュー',
          type1: 'くさ',
          type2: 'ドラゴン',
          weaks: ['こおり', 'どく', 'ひこう', 'むし', 'ドラゴン', 'フェアリー']
        },
        {
          id: 'f5d64c0c-5e59-4d74-aba8-9ebb0aafb6d7',
          name: 'キテルグマ',
          type1: 'ノーマル',
          type2: 'かくとう',
          weaks: ['かくとう', 'ひこう', 'エスパー', 'フェアリー']
        },
        {
          id: 'f7aebf3f-4272-4b6b-83fc-e950b2606413',
          name: 'クワガノン',
          type1: 'でんき',
          type2: 'むし',
          weaks: ['ほのお', 'いわ']
        },
        {
          id: 'fc29bbab-10d7-47e4-9ffd-a7b4a953cb3c',
          name: 'モスノウ',
          type1: 'こおり',
          type2: 'むし',
          weaks: ['ほのお', 'ひこう', 'いわ', 'はがね']
        },
        {
          id: 'fe600a0a-1488-4242-ad54-1fada72eca37',
          name: 'バリコオル',
          type1: 'こおり',
          type2: 'エスパー',
          weaks: ['ほのお', 'むし', 'いわ', 'ゴースト', 'あく', 'はがね']
        },
        {
          id: 'fe62512b-3122-4cfb-b856-cfab6706ed06',
          name: 'ローブシン',
          type1: 'かくとう',
          type2: null,
          weaks: ['ひこう', 'エスパー', 'フェアリー']
        },
        {
          id: '00140872-80df-4bd8-bf9e-b182323ea665',
          name: 'フライゴン',
          type1: 'じめん',
          type2: 'ドラゴン',
          weaks: ['こおり', 'ドラゴン', 'フェアリー']
        },
        {
          id: 'ff0cb95d-e9f6-48a7-a0c2-19f688373f45',
          name: 'マンムー',
          type1: 'こおり',
          type2: 'じめん',
          weaks: ['ほのお', 'みず', 'くさ', 'かくとう', 'はがね']
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
        },
        {
          id: '0c9a22d2-ae05-40e7-8fc6-32fdb107afff',
          name: 'オーベム',
          type1: 'エスパー',
          type2: null,
          weaks: ['むし', 'ゴースト', 'あく']
        },
        {
          id: '12101b9b-7e40-4298-a2ff-9d7ea2f60469',
          name: 'ダストダス',
          type1: 'どく',
          type2: null,
          weaks: ['じめん', 'エスパー']
        },
        {
          id: '137ac9c8-ae5f-4787-8954-86be737ebba9',
          name: 'リーフィア',
          type1: 'くさ',
          type2: null,
          weaks: ['ほのお', 'こおり', 'どく', 'ひこう', 'むし']
        },
        {
          id: '13b2059a-9674-4d2a-92f9-d976118f164f',
          name: 'フロストロトム',
          type1: 'でんき',
          type2: 'こおり',
          weaks: ['ほのお', 'かくとう', 'じめん', 'いわ']
        },
        {
          id: '13bbae82-6acf-41b6-9a57-7e1dba8f1741',
          name: 'インテレオン',
          type1: 'みず',
          type2: null,
          weaks: ['くさ', 'でんき']
        },
        {
          id: '13c246e3-1274-4674-ae2d-d68996181af5',
          name: 'エルフーン',
          type1: 'くさ',
          type2: 'フェアリー',
          weaks: ['ほのお', 'こおり', 'どく', 'ひこう', 'はがね']
        },
        {
          id: '198f08d7-6ec0-4986-9634-b87283ae6b3a',
          name: 'サニゴーン',
          type1: 'ゴースト',
          type2: null,
          weaks: ['ゴースト', 'あく']
        },
        {
          id: '1b72d661-b90f-4e67-853a-4cf428cc80fe',
          name: 'ハガネール',
          type1: 'じめん',
          type2: 'はがね',
          weaks: ['ほのお', 'みず', 'かくとう', 'じめん']
        },
        {
          id: '22a307c2-1874-4afc-b18c-4b4a9a11a246',
          name: 'エーフィ',
          type1: 'エスパー',
          type2: null,
          weaks: ['むし', 'ゴースト', 'あく']
        },
        {
          id: '2328ea34-e5a4-426a-a1d2-83240417f566',
          name: 'トリトドン',
          type1: 'みず',
          type2: 'じめん',
          weaks: ['くさ']
        },
        {
          id: '2416f431-0e04-414f-bcd0-0b5002b47227',
          name: 'ルカリオ',
          type1: 'かくとう',
          type2: 'はがね',
          weaks: ['ほのお', 'かくとう', 'じめん']
        },
        {
          id: '26192261-290f-4337-bf17-5686341e3a85',
          name: 'パッチルドン',
          type1: 'でんき',
          type2: 'こおり',
          weaks: ['ほのお', 'かくとう', 'じめん', 'いわ']
        },
        {
          id: '2bcb75aa-4089-428c-8dd4-5b0864d7ffac',
          name: 'オーロット',
          type1: 'くさ',
          type2: 'ゴースト',
          weaks: ['ほのお', 'こおり', 'ひこう', 'ゴースト', 'あく']
        },
        {
          id: '31027691-7f50-4084-9107-d03ff1f6faa2',
          name: 'グソクムシャ',
          type1: 'みず',
          type2: 'むし',
          weaks: ['でんき', 'ひこう', 'いわ']
        },
        {
          id: '310a2020-bd16-4857-8fa5-f18e0b5e8086',
          name: 'ブリムオン',
          type1: 'エスパー',
          type2: 'フェアリー',
          weaks: ['どく', 'ゴースト', 'はがね']
        },
        {
          id: '32209607-554e-43d9-aca7-9e2a64cde7d2',
          name: 'ゴチルゼル',
          type1: 'エスパー',
          type2: null,
          weaks: ['むし', 'ゴースト', 'あく']
        },
        {
          id: '3c6c90d7-ac08-4a20-9d7f-0fd1b2e5193d',
          name: 'シザリガー',
          type1: 'みず',
          type2: 'あく',
          weaks: ['くさ', 'でんき', 'かくとう', 'むし', 'フェアリー']
        },
        {
          id: '3da3ef08-c411-477b-9dfd-956d9ee7b1c5',
          name: 'ウオチルドン',
          type1: 'みず',
          type2: 'こおり',
          weaks: ['くさ', 'でんき', 'かくとう', 'いわ']
        },
        {
          id: '43a87790-13ce-4447-b29d-bcd654b902b0',
          name: 'ミロカロス',
          type1: 'みず',
          type2: null,
          weaks: ['くさ', 'でんき']
        },
        {
          id: '462331c1-afab-4d8a-ac53-ebdcfc00a75a',
          name: 'ナマコブシ',
          type1: 'みず',
          type2: null,
          weaks: ['くさ', 'でんき']
        },
        {
          id: '4a7e6d50-8185-4279-95cd-bc0669399be8',
          name: 'カジリガメ',
          type1: 'みず',
          type2: 'いわ',
          weaks: ['くさ', 'でんき', 'かくとう', 'じめん']
        },
        {
          id: 'd61dc2bf-1519-4d78-8325-92170d5f2900',
          name: 'ギガイアス',
          type1: 'いわ',
          type2: null,
          weaks: ['かくとう', 'みず', 'くさ', 'はがね', 'じめん']
        },
        {
          id: '4afa9e91-61a1-4f1c-9da9-f96468109dc3',
          name: 'ブースター',
          type1: 'ほのお',
          type2: null,
          weaks: ['みず', 'じめん', 'いわ']
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
