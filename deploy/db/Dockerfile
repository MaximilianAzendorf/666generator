FROM couchdb:3.1.1

ARG DB_TOKEN_KEY
ARG DB_ADMIN_PASSWORD
ARG DB_ADMIN_USERNAME=admin

RUN test -n "$DB_TOKEN_KEY" && test -n "$DB_ADMIN_PASSWORD";

COPY local.ini /opt/couchdb/etc/local.ini

RUN sed -i -e \
"s/%TOKEN_KEY/`echo -n "$DB_TOKEN_KEY" | base64 -w0`/g;\
 s/%ADMIN_USERNAME/$DB_ADMIN_USERNAME/g;\
 s/%ADMIN_PASSWORD/$DB_ADMIN_PASSWORD/g"\
 /opt/couchdb/etc/local.ini
