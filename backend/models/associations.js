const Gymnast = require('./gymnast');
const GymnastGroup = require('./gymnastGroup');
const Session = require('./session');
const Event = require('./event');
const Execution = require('./execution');

Gymnast.belongsTo(GymnastGroup, {
  foreignKey: 'group_id'
});

GymnastGroup.hasMany(Gymnast, {
  foreignKey: 'group_id'
});

GymnastGroup.belongsTo(Session, {
  foreignKey: 'session_id'
});

Session.belongsTo(Competition, {
  foreignKey: 'competition_id'
});
  
Session.belongsTo(TimeSlot, {
  foreignKey: 'time_slot_id'
});

Event.belongsTo(Session, {
  foreignKey: 'session_id'
});

Event.belongsTo(Apparatus, {
  foreignKey: 'apparatus_id'
});

Execution.belongsTo(Event, {
  foreignKey: 'event_id'
});

Execution.belongsTo(Gymnast, {
  foreignKey: 'gymnast_id'
});

Execution.belongsTo(Judge, {
  foreignKey: 'judge_id'
});

Difficulty.belongsTo(Event, {
  foreignKey: 'event_id'
});

Difficulty.belongsTo(Gymnast, {
  foreignKey: 'gymnast_id'
});

Difficulty.belongsTo(Judge, {
  foreignKey: 'judge_id'
});

module.exports = {
  Gymnast,
  GymnastGroup,
  Session,
  Event,
};