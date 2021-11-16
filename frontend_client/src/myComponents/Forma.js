import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "semantic-ui-react";

export default function Forma(props) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    /*if (data.pattern == "") {
      return;
    }*/

    console.log(data);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      accepts: "application/json",
    };

    let query = "?";

    if (data.pattern != "") {
      query = query + "pattern=" + data.pattern;
    }
    query += "&what_search=" + data.what_search;

    console.log("query: " + query);

    fetch("/api" + query, requestOptions)
      /*fetch("/kaco_data.json", requestOptions)*/
      .then((response) => response.text())
      .then((result) => {
        console.log(JSON.parse(result)[0].json_agg);
        props.postaviData(JSON.parse(result)[0].json_agg);
      })
      .catch((error) => props.postaviData(""));
  };
  console.log(errors);

  return (
    <form className="forma" onSubmit={handleSubmit(onSubmit)}>
      <Input>
        <input
          type="text"
          placeholder="Polje za pretragu"
          name="tekst"
          {...register("pattern")}
        />
      </Input>

      <div className="moj_radio">
        <label>
          <input
            name="Odaberite polje za pretragu"
            type="radio"
            value="any"
            defaultChecked
            {...register("what_search")}
          />
          Dohvati sve
        </label>
        <label>
          <input
            name="Odaberite polje za pretragu"
            type="radio"
            value="postrojenje"
            {...register("what_search")}
          />
          Postrojenje
        </label>
        <label>
          <input
            name="Odaberite polje za pretragu"
            type="radio"
            value="post_number"
            {...register("what_search")}
          />
          Poštanski broj
        </label>

        <label>
          <input
            name="Odaberite polje za pretragu"
            type="radio"
            value="nom_power"
            {...register("what_search")}
          />
          Nominalna snaga
        </label>

        <label>
          <input
            name="Odaberite polje za pretragu"
            type="radio"
            value="out_power"
            {...register("what_search")}
          />
          Izlazna snaga
        </label>
      </div>
      <Button primary type="submit" value="Pretraži">
        Pretraži
      </Button>
    </form>
  );
}
