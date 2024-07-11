// Max Cheat time (ms)
const CheatTime = 5999;

const fastify = require('fastify')({ logger: true });
const path = require('path');

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: path.join(__dirname, './db.sqlite'),
    },
    pool: {
        min: 0,
        max: 7,
    },
    useNullAsDefault: true,
});

async function initDatabase() {
    console.log('Database init');
    if (!(await knex.schema.hasTable('ranks'))) {
        console.log('Create ranks table');
        await knex.schema.createTable('ranks', (builder) => {
            builder.increments('id');
            builder.string('username');
            builder.integer('wpm');
            builder.string('text');
            builder.integer('upload_time').defaultTo(knex.fn.now());
        });
    }
    if (!(await knex.schema.hasTable('cheats'))) {
        console.log('Create cheats table');
        await knex.schema.createTable('cheats', (builder) => {
            builder.increments('id');
            builder.string('username');
            builder.integer('wpm');
            builder.integer('upload_time').defaultTo(knex.fn.now());
        });
    }
}

function initWeb() {
    fastify.register(require('@fastify/static'), {
        root: path.join(__dirname, '/static'),
    });

    fastify.post('/', (request, reply) => {
        return { ok: true };
    });

    fastify.post(
        '/upload',
        {
            schema: {
                body: {
                    type: 'object',
                    required: ['name', 'time', 'text'],
                    properties: {
                        name: {
                            type: 'string',
                            minLength: 1,
                            maxLength: 24,
                        },
                        time: {
                            type: 'number',
                        },
                        text: {
                            type: 'string',
                            minLength: 5,
                        },
                    },
                },
            },
        },
        async (request, reply) => {
            const { name: username, time, text } = request.body;
            const wpm = Math.round((text.length / time) * 12000);
            if (request.body.time <= CheatTime) {
                await knex
                    .insert({
                        username,
                        wpm,
                        upload_time: new Date().getTime(),
                    })
                    .into('cheats');
            } else {
                await knex
                    .insert({
                        username,
                        wpm,
                        text,
                        upload_time: new Date().getTime(),
                    })
                    .into('ranks');
            }
            return { ok: true };
        }
    );

    fastify.get(
        '/ranks',
        {
            schema: {
                querystring: {
                    type: 'object',
                    properties: {
                        limit: {
                            type: 'number',
                            maximum: 30,
                        },
                        offset: {
                            type: 'number',
                        },
                        orderAsc: {
                            type: 'boolean',
                        },
                        cheat: {
                            type: 'boolean',
                        },
                    },
                },
            },
        },
        async (request, reply) => {
            var query = knex
                .select('*')
                .from(request.query.cheat ? 'cheats' : 'ranks')
                .orderBy('wpm', request.query.orderAsc ? 'asc' : 'desc');
            if (request.query.limit) query.limit(request.query.limit);
            if (request.query.offset) query.offset(request.query.offset);
            return { data: await query };
        }
    );

    fastify.listen({ port: 1293 }, (err) => {
        if (err) {
            fastify.log.error(err);
            process.exit(1);
        }
    });
}

initDatabase();
initWeb();
