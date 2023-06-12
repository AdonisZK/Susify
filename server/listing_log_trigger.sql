CREATE OR REPLACE FUNCTION log_listing_changes() RETURNS TRIGGER AS $$ BEGIN
INSERT INTO "ListingLog" (
        "listingId",
        "titleOld",
        "titleNew",
        "descriptionOld",
        "descriptionNew",
        "categoryOld",
        "categoryNew",
        "stockOld",
        "stockNew",
        "priceOld",
        "priceNew"
    )
VALUES (
        NEW.id,
        OLD.title,
        NEW.title,
        OLD.description,
        NEW.description,
        OLD.category,
        NEW.category,
        OLD.stock,
        NEW.stock,
        OLD.price,
        NEW.price
    );
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER log_listing_changes_trigger
AFTER
UPDATE ON "Listing" FOR EACH ROW EXECUTE FUNCTION log_listing_changes();