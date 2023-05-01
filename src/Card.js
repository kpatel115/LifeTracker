class Card {
  constructor(id, name, meals, macros, calories, water, workout, type, duration, notes, time ) {
    this.id = id;
    this.name = name;
    this.meals = meals;
    this.macros = macros
    this.calories = calories;
    this.water = water;
    this.workout = workout;
    this.type = type;
    this.duration = duration;
    this.notes = notes;
    this.time = time;
  }
}

module.exports = Card