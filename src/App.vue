<template>
  <div id="app">
    <div class="wrapper">
      <form @submit.prevent="formSubmit" class="form">
        <div class="form__block">
          <h1 class="form__title">Основная Информация</h1>
          <div class="form__row">
            <div class="form__group form__group-select">
              <div class="form__label">Ваш пол</div>
              <CustomSelect
                class="gender-select"
                :options="['Муж', 'Жен']"
                @select="setGender($event)"
              />
            </div>
            <div class="form__group">
              <label for="" class="form__control">
                <div class="form__label">Имя *</div>
                <input
                  type="text"
                  class="form__input"
                  :class="{
                    form__input_error: $v.form.firstName.$error,
                  }"
                  v-model="form.firstName"
                />
              </label>
              <div class="form__errors">
                <div
                  class="form__error"
                  v-if="!$v.form.firstName.required && $v.form.firstName.$dirty"
                >
                  Поле должно быть заполнено
                </div>
                <div
                  class="form__error"
                  v-else-if="
                    !$v.form.firstName.alphaValid && $v.form.firstName.$dirty
                  "
                >
                  Имя должно содержать только русские буквы
                </div>
              </div>
            </div>
            <div class="form__group">
              <label for="" class="form__control">
                <div class="form__label">Фамилия *</div>
                <input
                  type="text"
                  class="form__input"
                  :class="{
                    form__input_error: $v.form.midleName.$error,
                  }"
                  v-model="form.midleName"
                />
              </label>
              <div class="form__errors">
                <div
                  class="form__error"
                  v-if="!$v.form.midleName.required && $v.form.midleName.$dirty"
                >
                  Поле должно быть заполнено
                </div>
                <div
                  class="form__error"
                  v-else-if="
                    !$v.form.midleName.alphaValid && $v.form.midleName.$dirty
                  "
                >
                  Фамилия должно содержать только русские буквы
                </div>
              </div>
            </div>
            <div class="form__group">
              <label for="" class="form__control">
                <div class="form__label">Отчество</div>
                <input
                  type="text"
                  class="form__input"
                  :class="{
                    form__input_error: $v.form.lastName.$error,
                  }"
                  v-model="form.lastName"
                />
              </label>
              <div class="form__errors">
                <div
                  class="form__error"
                  v-if="!$v.form.lastName.alphaValid && $v.form.lastName.$dirty"
                >
                  Отчество должно содержать только русские буквы
                </div>
              </div>
            </div>
          </div>
          <div class="form__row">
            <div class="form__group">
              <label for="" class="form__control">
                <div class="form__label">Дата рождения *</div>
                <input
                  type="date"
                  class="form__input"
                  :class="{
                    form__input_error: $v.form.personDate.$error,
                  }"
                  v-model="form.personDate"
                />
              </label>
              <div class="form__errors">
                <div
                  class="form__error"
                  v-if="
                    !$v.form.personDate.required && $v.form.personDate.$dirty
                  "
                >
                  Поле должно быть заполнено
                </div>
              </div>
            </div>
            <div class="form__group">
              <label for="" class="form__control">
                <div class="form__label">Номер *</div>
                <input
                  type="number"
                  class="form__input"
                  :class="{
                    form__input_error: $v.form.personNumber.$error,
                  }"
                  placeholder="+7 (---) --- -- --"
                  v-model="form.personNumber"
                />
              </label>
              <div class="form__errors">
                <div
                  class="form__error"
                  v-if="
                    !$v.form.personNumber.required &&
                    $v.form.personNumber.$dirty
                  "
                >
                  Поле должно быть заполнено
                </div>
                <div
                  class="form__error"
                  v-else-if="
                    !$v.form.personNumber.numberValid &&
                    $v.form.personNumber.$dirty
                  "
                >
                  Номер должен начинаться с 7
                </div>
                <div
                  class="form__error"
                  v-else-if="
                    !$v.form.personNumber.numberLength &&
                    $v.form.personNumber.$dirty
                  "
                >
                  Длина номера должна быть 11
                </div>
              </div>
            </div>
          </div>
          <div class="form__row">
            <div class="form__group">
              <div class="form__label">Группа клиентов *</div>
              <CustomSelect
                :options="['VIP', 'Проблемные', 'ОМС']"
                :multi="true"
                default="Проблемные"
                @select="setGroup($event)"
              />
            </div>
            <div class="form__group">
              <div class="form__label">Лечащий врач</div>
              <CustomSelect
                :options="['Иванов', 'Захаров', 'Чернышева', 'Нет']"
                default="Нет"
                @select="setMedic($event)"
              />
            </div>
          </div>
        </div>
        <!-- -->
        <div class="form__block">
          <h1 class="form__title">Документ</h1>
          <div class="form__row">
            <div class="form__group">
              <div class="form__label">Тип документа</div>
              <CustomSelect
                class="doc-select"
                :options="[
                  'Паспорт',
                  'Свидетельство о рождении',
                  'Вод. удостоверение',
                ]"
                default="Паспорт"
                @select="setDoc($event)"
              />
            </div>
          </div>
          <div class="form__row">
            <div class="form__group">
              <label for="" class="form__control">
                <div class="form__label">Номер</div>
                <input
                  type="number"
                  class="form__input"
                  :class="{
                    form__input_error:
                      $v.form.docNumber.$error && form.docType === 'Паспорт',
                  }"
                  placeholder="1234"
                  v-model="form.docNumber"
                />
              </label>
              <div class="form__errors">
                <div
                  class="form__error"
                  v-if="!$v.form.docNumber.required && $v.form.docNumber.$dirty"
                >
                  Поле для паспорта должно быть заполнено
                </div>
                <div
                  class="form__error"
                  v-else-if="
                    !$v.form.docNumber.pasportLength &&
                    $v.form.docNumber.$dirty &&
                    form.docType === 'Паспорт'
                  "
                >
                  Номер должен иметь формат 1234
                </div>
              </div>
            </div>
            <div class="form__group" v-if="form.docType === 'Паспорт'">
              <label for="" class="form__control">
                <div class="form__label">Серия</div>
                <input
                  type="number"
                  class="form__input"
                  :class="{
                    form__input_error: $v.form.series.$error,
                  }"
                  placeholder="123456"
                  v-model="form.series"
                />
              </label>
              <div class="form__errors">
                <div
                  class="form__error"
                  v-if="!$v.form.series.required && $v.form.series.$dirty"
                >
                  Поле для паспорта должно быть заполнено
                </div>
                <div
                  class="form__error"
                  v-else-if="
                    !$v.form.series.seriesLength && $v.form.series.$dirty
                  "
                >
                  Серия должна иметь формат 123456
                </div>
              </div>
            </div>
          </div>
          <div class="form__row">
            <div class="form__group">
              <label for="" class="form__control">
                <div class="form__label">Кем выдан</div>
                <input type="text" class="form__input" v-model="form.info" />
              </label>
            </div>
            <div class="form__group">
              <label for="" class="form__control">
                <div class="form__label">Дата выдачи</div>
                <input
                  type="date"
                  class="form__input"
                  :class="{
                    form__input_error: $v.form.docDate.$error,
                  }"
                  v-model="form.docDate"
                />
              </label>
              <div class="form__errors">
                <div
                  class="form__error"
                  v-if="!$v.form.docDate.required && $v.form.docDate.$dirty"
                >
                  Поле должно быть заполнено
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- -->
        <div class="form__block">
          <h1 class="form__title">Адресс</h1>
          <div class="form__row">
            <div class="form__group">
              <label for="" class="form__control">
                <div class="form__label">Страна</div>
                <input type="text" class="form__input" v-model="form.country" />
              </label>
            </div>
            <div class="form__group">
              <label for="" class="form__control">
                <div class="form__label">Область</div>
                <input type="text" class="form__input" v-model="form.region" />
              </label>
            </div>
            <div class="form__group">
              <label for="" class="form__control">
                <div class="form__label">Город *</div>
                <input
                  type="text"
                  class="form__input"
                  :class="{
                    form__input_error: $v.form.sity.$error,
                  }"
                  v-model="form.sity"
                />
              </label>
              <div class="form__errors">
                <div
                  class="form__error"
                  v-if="!$v.form.sity.required && $v.form.sity.$dirty"
                >
                  Поле должно быть заполнено
                </div>
              </div>
            </div>
          </div>
          <div class="form__row">
            <div class="form__group">
              <label for="" class="form__control">
                <div class="form__label">Улица</div>
                <input type="text" class="form__input" v-model="form.street" />
              </label>
            </div>
            <div class="form__group">
              <label for="" class="form__control">
                <div class="form__label">Дом</div>
                <input type="text" class="form__input" v-model="form.home" />
              </label>
            </div>
            <div class="form__group">
              <label for="" class="form__control">
                <div class="form__label">Индекс</div>
                <input type="number" class="form__input" v-model="form.index" />
              </label>
            </div>
          </div>
        </div>

        <div class="form__row">
          <div class="button__container">
            <label class="form__check-wrap">
              <input
                class="form__checkbox"
                type="checkbox"
                name="checkbox"
                v-model="form.sms"
              />
              Не отправлять СМС
            </label>
            <button
              type="submit"
              class="button"
              :class="{ button_disabled: alertSuccess || alertErr }"
              :disabled="alertSuccess || alertErr"
            >
              Submit
            </button>
          </div>
        </div>

        <div class="form__alert-container" v-if="alertErr || alertSuccess">
          <div class="form__alert form__alert_err" v-if="alertErr">
            Заполните форму правильно
          </div>
          <div class="form__alert form__alert_success" v-if="alertSuccess">
            Пользователь успешно создан
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import CustomSelect from "./components/CustomSelect.vue";
import { required, requiredIf } from "vuelidate/lib/validators";
import {
  numberValid,
  numberLength,
  seriesLength,
  alphaValid,
  pasportLength,
} from "./customValid/formValid.js";

export default {
  name: "App",
  components: {
    CustomSelect,
  },

  data() {
    return {
      alertErr: false,
      alertSuccess: false,
      form: {
        firstName: "",
        midleName: "",
        lastName: "",
        personDate: "",
        personNumber: "",
        group: "",
        medic: "",
        gender: "",
        docType: "",
        docNumber: "",
        series: "",
        info: "",
        docDate: "",
        country: "",
        region: "",
        sity: "",
        street: "",
        home: "",
        index: "",
        sms: false,
      },
    };
  },

  methods: {
    setGroup(group) {
      this.form.group = group;
    },
    setMedic(medic) {
      this.form.medic = medic;
    },
    setGender(gender) {
      this.form.gender = gender;
    },
    setDoc(document) {
      this.form.docType = document;
    },
    formSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        this.alertErr = true;
        setTimeout(() => (this.alertErr = false), 2000);
        return;
      }
      this.resetForm();
      this.$v.$reset();
      this.alertSuccess = true;
      setTimeout(() => (this.alertSuccess = false), 2000);
    },
    resetForm() {
      for (var item in this.form) {
        if (item === "group") {
          this.form[item] = this.form[item][0];
        }
        if (item === "sms") {
          this.form[item] = false;
        }
        this.form[item] = "";
      }
    },
  },

  validations: {
    form: {
      firstName: {
        required,
        alphaValid,
      },
      midleName: {
        required,
        alphaValid,
      },
      lastName: {
        alphaValid,
      },
      personDate: {
        required,
      },
      personNumber: {
        required,
        numberValid,
        numberLength,
      },
      group: {
        required,
      },
      docType: {
        required,
      },
      docNumber: {
        required: requiredIf(function () {
          return this.form.docType === "Паспорт";
        }),
        pasportLength,
      },
      series: {
        required: requiredIf(function () {
          return this.form.docType === "Паспорт";
        }),
        seriesLength,
      },
      docDate: {
        required,
      },
      sity: {
        required,
      },
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.gender-select {
  width: 120px;

  @include media("sm") {
    width: auto;
  }
}
.doc-select {
  width: auto;
}
</style>
