CREATE OR REPLACE FUNCTION log_user_changes() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO "UserLog" (
        "userId",
        "usernameOld",
        "usernameNew",
        "descriptionOld",
        "descriptionNew",
        "addressOld",
        "addressNew",
        "noOld",
        "noNew"
    )
    VALUES (
        NEW.id,
        OLD.username,
        NEW.username,
        OLD.description,
        NEW.description,
        OLD.address,
        NEW.address,
        OLD.no,
        NEW.no
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER log_user_changes_trigger
AFTER
UPDATE ON "User" FOR EACH ROW EXECUTE FUNCTION log_user_changes();
