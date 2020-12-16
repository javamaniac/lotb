rm -r data-compendium/* \
&& mkdir -p data-compendium/bespokes \
&& mkdir -p data-compendium/characters \
&& mkdir -p data-compendium/talismans

node lotb-compendium/characters/index.js && node lotb-compendium/bespoke/index.js && node lotb-compendium/talismans/index.js