import { Schema, model } from 'mongoose';

const RoleSchema = new Schema({
    role: {
        type: String,
        required: [true, 'Role is mandatory']
    }
});


// module.exports = model( 'Role', RoleSchema );
const Role = model('Role', RoleSchema);
export default Role;