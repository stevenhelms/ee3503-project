class Hotel {
    constructor(id, url, name, address, phone_number, vicinity, types, google_place_id, geometry, updated_at, created_at) { 
        this.id = id;
        this.url = url;
        this.name = name;
        this.address = address,
        this.phone_number = phone_number,
        this.vicinity = vicinity,
        this.types = types,
        this.google_place_id = google_place_id,
        this.geometry = geometry,
        this.updated_at = updated_at,
        this.created_at = created_at
    }
};

export default Hotel;