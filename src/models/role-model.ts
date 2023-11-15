/**
 * Role Model
 *
 * This schema defines the structure for the 'Role' model using Mongoose.
 * It is used to represent user roles within the application, ensuring
 * that each role has a unique identifier.
 *
 * Fields:
 * - role: The name of the role, which is required and should be unique.
 */

import { Schema, model } from 'mongoose';

/**
 * Role Schema
 *
 * This schema defines the structure for the 'Role' model using Mongoose.
 * It ensures that each role has a unique name, which is mandatory for
 * identifying different user roles within the application.
 */
const RoleSchema = new Schema({
    role: {
        type: String,
        required: [true, 'Role is mandatory'],
        unique: true // Ensures that the role name is unique
    }
});

// Adding a unique index to the 'role' field for ensuring uniqueness at the database level
RoleSchema.index({ role: 1 }, { unique: true });

// Creating the model from the schema
const Role = model('Role', RoleSchema);

export default Role;