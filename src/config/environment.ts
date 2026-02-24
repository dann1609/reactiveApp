import baseEnvironment from '../../.env.json';
// .env.json was added as a test environment. Other environment are in .gitignore.

export interface IEnvironment {
    environment: string
    services: {
        storage: {
            key: string
        }
    }
}

export const environment: IEnvironment = baseEnvironment;