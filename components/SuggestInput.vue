<template>
  <div>
    <div
      v-if="value.length > 0 && suggest"
      @click="suggest = false"
      class="fixed inset-0"
    />
    <div class="relative z-10">
      <input
        @focus="$emit('input', $event.target.value), (suggest = true)"
        @input="$emit('input', $event.target.value)"
        @keydown.prevent.tab.exact="$emit('tab', $event), (suggest = false)"
        @keydown.prevent.shift.exact="$emit('shift', $event), (suggest = false)"
        @keydown.prevent.right.exact="$emit('tab', $event), (suggest = false)"
        @keydown.prevent.left.exact="$emit('shift', $event), (suggest = false)"
        @keydown.prevent.backspace.exact="$emit('Backspace')"
        :value="value"
        placeholder="ポケモンを入力"
        class="outline-none input-item"
        type="text"
      />
      <div
        v-if="value.length > 0 && suggest"
        class="bg-white shadow w-40 mt-1 absolute"
      >
        <div
          v-for="item in list"
          :key="item.id"
          @click="$emit('setName', item.name), (suggest = false)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      suggest: false
    }
  }
}
</script>
