#!/usr/bin/env fish

set OUT extension.zip

zip -r $OUT . \
    -x "*[Rr][Ee][Aa][Dd][Mm][Ee]*" \
    -x "*.git*" \
    -x "*/.git/*" \
    -x "*/.fish/*"
