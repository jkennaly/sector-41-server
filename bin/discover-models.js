// bin/discover-models.js

'use strict';

const loopback = require('loopback');
const promisify = require('util').promisify;
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const mkdirp = promisify(require('mkdirp'));

const DATASOURCE_NAME = 'DragonAgeFestivalMaster';
const dataSourceConfig = require('../server/datasources.json');
const db = new loopback.DataSource(dataSourceConfig[DATASOURCE_NAME]);

discover().then(
  success => process.exit(),
  error => { console.error('UNHANDLED ERROR:\n', error); process.exit(1); },
);

async function discover() {
  // It's important to pass the same "options" object to all calls
  // of dataSource.discoverSchemas(), it allows the method to cache
  // discovered related models
  const options = {relations: true};

  // Discover models and relations
  const seriesSchemas = await db.discoverSchemas('festival_series', options);
  const festivalSchemas = await db.discoverSchemas('festivals', options);
  const dateSchemas = await db.discoverSchemas('dates', options);
  const daySchemas = await db.discoverSchemas('days', options);
  const setSchemas = await db.discoverSchemas('sets', options);

  const venueSchemas = await db.discoverSchemas('venues', options);
  const organizerSchemas = await db.discoverSchemas('organizers', options);
  const placeSchemas = await db.discoverSchemas('places', options);

  const lineupSchemas = await db.discoverSchemas('band_list', options);
  const artistPrioritySchemas = await db.discoverSchemas('band_priorities', options);
  const stagePrioritySchemas = await db.discoverSchemas('stage_priorities', options);
  const stageLayoutSchemas = await db.discoverSchemas('stage_layouts', options);
  const placeTypeSchemas = await db.discoverSchemas('placetypes', options);

  const messageSchemas = await db.discoverSchemas('messages', options);
  const userSchemas = await db.discoverSchemas('Users', options);
  const artistSchemas = await db.discoverSchemas('bands', options);

  const parentGenreSchemas = await db.discoverSchemas('genre_parents', options);
  const genreSchemas = await db.discoverSchemas('genres', options);
  const artistGenreSchemas = await db.discoverSchemas('bandgenres', options);

  // Create model definition files
  await mkdirp('../common/models');
  await writeFile(
    '../common/models/series.json',
    JSON.stringify(seriesSchemas['festival_master.festival_series'], null, 2)
  );
  await writeFile(
    '../common/models/festival.json',
    JSON.stringify(festivalSchemas['festival_master.festivals'], null, 2)
  );
  await writeFile(
    '../common/models/date.json',
    JSON.stringify(dateSchemas['festival_master.dates'], null, 2)
  );
  await writeFile(
    '../common/models/day.json',
    JSON.stringify(daySchemas['festival_master.days'], null, 2)
  );
  await writeFile(
    '../common/models/set.json',
    JSON.stringify(setSchemas['festival_master.sets'], null, 2)
  );
  await writeFile(
    '../common/models/venue.json',
    JSON.stringify(venueSchemas['festival_master.venues'], null, 2)
  );
  await writeFile(
    '../common/models/organizer.json',
    JSON.stringify(organizerSchemas['festival_master.organizers'], null, 2)
  );
  await writeFile(
    '../common/models/place.json',
    JSON.stringify(placeSchemas['festival_master.places'], null, 2)
  );
  await writeFile(
    '../common/models/lineup.json',
    JSON.stringify(lineupSchemas['festival_master.band_list'], null, 2)
  );
  await writeFile(
    '../common/models/artistPriority.json',
    JSON.stringify(artistPrioritySchemas['festival_master.band_priorities'], null, 2)
  );
  await writeFile(
    '../common/models/stagePriority.json',
    JSON.stringify(stagePrioritySchemas['festival_master.stage_priorities'], null, 2)
  );
  await writeFile(
    '../common/models/stageLayout.json',
    JSON.stringify(stageLayoutSchemas['festival_master.stage_layouts'], null, 2)
  );
  await writeFile(
    '../common/models/placeType.json',
    JSON.stringify(placeTypeSchemas['festival_master.placetypes'], null, 2)
  );
  await writeFile(
    '../common/models/message.json',
    JSON.stringify(messageSchemas['festival_master.messages'], null, 2)
  );
  await writeFile(
    '../common/models/user.json',
    JSON.stringify(userSchemas['festival_master.Users'], null, 2)
  );
  await writeFile(
    '../common/models/artist.json',
    JSON.stringify(artistSchemas['festival_master.bands'], null, 2)
  );
  await writeFile(
    '../common/models/parentGenre.json',
    JSON.stringify(parentGenreSchemas['festival_master.genre_parents'], null, 2)
  );
  await writeFile(
    '../common/models/genre.json',
    JSON.stringify(genreSchemas['festival_master.genres'], null, 2)
  );
  await writeFile(
    '../common/models/artistGenre.json',
    JSON.stringify(artistGenreSchemas['festival_master.bandgenres'], null, 2)
  );

  // Expose models via REST API
  const configJson = await readFile('../server/model-config.json', 'utf-8');
  console.log('MODEL CONFIG', configJson);
  const config = JSON.parse(configJson);
  config.Series = {dataSource: DATASOURCE_NAME, public: true};
  config.Festival = {dataSource: DATASOURCE_NAME, public: true};
  config.Date = {dataSource: DATASOURCE_NAME, public: true};
  config.Day = {dataSource: DATASOURCE_NAME, public: true};
  config.Set = {dataSource: DATASOURCE_NAME, public: true};
  config.Venue = {dataSource: DATASOURCE_NAME, public: true};
  config.Organizer = {dataSource: DATASOURCE_NAME, public: true};
  config.Place = {dataSource: DATASOURCE_NAME, public: true};
  config.Lineup = {dataSource: DATASOURCE_NAME, public: true};
  config.ArtistPriority = {dataSource: DATASOURCE_NAME, public: true};
  config.StagePriority = {dataSource: DATASOURCE_NAME, public: true};
  config.StageLayout = {dataSource: DATASOURCE_NAME, public: true};
  config.PlaceType = {dataSource: DATASOURCE_NAME, public: true};
  config.Message = {dataSource: DATASOURCE_NAME, public: true};
  config.User = {dataSource: DATASOURCE_NAME, public: true};
  config.Artist = {dataSource: DATASOURCE_NAME, public: true};
  config.ParentGenre = {dataSource: DATASOURCE_NAME, public: true};
  config.Genre = {dataSource: DATASOURCE_NAME, public: true};
  config.ArtistGenre = {dataSource: DATASOURCE_NAME, public: true};
  await writeFile(
    '../server/model-config.json',
    JSON.stringify(config, null, 2)
  );
}
