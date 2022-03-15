import {
    Query,
    Update,
    Candid,
    ic
} from 'azle';

type DB = {
    users: {
        [id: string]: User;
    };
};

type User = Candid<{
    id: string;
    username: string;
}>;

type Users = Candid<User[]>;

let db: DB = {
    users: {}
};

export function getUserById(id: string): Query<User> {
    const user = db.users[id] as User | undefined;

    if (user === undefined) {
        ic.trap('user not found');
    }

    return user;
}

export function getAllUsers(): Query<Users> {
    return Object.values(db.users);
}

export function createUser(username: string): Update<User> {
    const id = Object.keys(db.users).length.toString();
    
    const user = {
        id,
        username
    };

    db.users[id] = user;

    return user;
}