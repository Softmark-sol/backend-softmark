const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "appbasicPlane",
  tableName: "app_basic_plane",
  columns: {
    id: {
        type: "int",
        primary: true,
        generated: true,
      },
      clientId: {
        type: "varchar",
        unique: true,
      },
      name: {
        type: "varchar",
      },
      email: {
        type: "varchar",
      },
      company: {
        type: "varchar",
        nullable: true,
      },
      reference_App: {
        type: "varchar",
        nullable: true,
      },
      drive_links_to_icons:{
        type:"varchar",
        nullable:true
      },
      description: {
        type: "varchar",
      },
      Link_to_Graphics: {
        type: "varchar",
        nullable: true,
      },
        plane:{
        type:"varchar",
        default: "App basic plane",
        },
      created_at: {
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
      },
      updated_at: {
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
      },
 
  },
  relations: {
    client: {
      target: "Client",
      type: "many-to-one",
      joinColumn: { name: "clientId", referencedColumnName: "clientId" },
    },
  },
});