<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div
      class="selected"
      :class="{ selected_open: open }"
      @click="open = !open"
    >
      {{ multi ? multiStr : selected }}
      <span
        class="selected__icon"
        :class="{ selected__icon_open: open }"
      ></span>
    </div>
    <div class="custom-select__items" :class="{ selectHide: !open }">
      <div
        class="custom-select__item"
        v-for="(option, i) of options"
        :key="i"
        @click="multi ? multiSelect(option) : select(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
    multi: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      selected: this.default || this.options[0],
      open: false,
      multiSelected: [this.default || this.options[0]],
    };
  },

  computed: {
    multiStr() {
      return this.multiSelected.join(", ");
    },
  },

  methods: {
    multiSelect(option) {
      const index = this.multiSelected.findIndex((item) => item === option);
      if (index >= 0 && this.multiSelected.length === 1) return;

      index >= 0
        ? this.multiSelected.splice(index, 1)
        : this.multiSelected.push(option);
      this.$emit("select", this.multiSelected);
    },
    select(option) {
      this.selected = option;
      this.open = false;
      this.$emit("select", option);
    },
  },

  mounted() {
    this.$emit("select", this.selected);
  },
};
</script>

<style lang="scss">
.custom-select {
  position: relative;

  .selected {
    @import "../scss/mixins.scss";

    @include input();

    color: #000;
    padding: 0px 40px 0px 15px;
    cursor: pointer;
    user-select: none;
    position: relative;
    width: 100%;
    border: 1px solid #ccc;
    box-shadow: inset 0 1px 1px rgb(0, 0, 0, 0.08);

    &_open {
      @include inputFocus();

      &:hover {
        @include inputFocus();
      }
    }

    &__icon {
      position: absolute;
      top: 0;
      right: 0;
      width: 40px;
      height: 40px;

      &:after {
        position: absolute;
        content: "";
        top: 50%;
        right: 50%;
        transform: translate(50%, -40%);
        width: 0;
        height: 0;
        border: 5px solid transparent;
        border-color: #000 transparent transparent transparent;
      }
      &_open {
        transform: rotate(180deg);
        &:after {
          transform: translate(50%, -20%);
        }
      }
    }
  }

  &__items {
    color: #000;
    border-radius: 6px;
    position: absolute;
    background-color: #fff;
    min-width: 170px;
    top: 110%;
    left: 0;
    right: 0;
    z-index: 1;

    @include inputFocus();
  }

  &__item {
    padding: 5px 10px;
    min-height: 30px;
    color: #000;
    cursor: pointer;
    user-select: none;
    outline: none;
    display: flex;
    align-items: center;

    &:hover {
      background-color: rgb(37, 76, 173);
      color: #fff;
    }
  }
}
.selectHide {
  display: none;
}
</style>
