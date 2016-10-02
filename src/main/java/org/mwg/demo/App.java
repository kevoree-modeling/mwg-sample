package org.mwg.demo;

import io.undertow.Undertow;
import io.undertow.server.handlers.resource.ClassPathResourceManager;
import org.mwg.*;
import org.mwg.ml.MLPlugin;
import org.mwg.task.Task;

import static io.undertow.Handlers.path;
import static io.undertow.Handlers.resource;
import static org.mwg.task.Actions.*;

public class App {

    private static int WEB_PORT = 8080;
    private static int MWG_PORT = 8081;

    public static void main(String[] args) {
        //expose local classpath are web resource
        Undertow.builder().addHttpListener(WEB_PORT, "0.0.0.0")
                .setHandler(path().addPrefixPath("/", resource(new ClassPathResourceManager(App.class.getClassLoader(), "")).addWelcomeFiles("index.html")))
                .build()
                .start();
        System.out.println("Server started...go to to http://localhost:8080/");
        //build a graph with some plugin
        Graph g = new GraphBuilder()
                .withStorage(new LevelDBStorage("mwg_sample_db"))
                .withPlugin(new MLPlugin())
                .build();
        //connect the newly created graph
        g.connect(connectionResult -> {
            //expose the webServer
            new WSServer(g, MWG_PORT).start();

            loop("0", "99",
                    setTime("{{i}}").subTask(findOrCreateRoom)
            ).save().execute(g, null);

        });
    }

    private static final Task findOrCreateRoom =
            fromIndex("rooms", "name=room_{{i}}")
                    .ifThen(context -> context.result().size() == 0,
                            newNode()
                                    .setProperty("name", Type.STRING, "room_{{i}}")
                                    .indexNode("rooms", "name")
                                    .asVar("room")
                                    .loop("0", "19",
                                            newNode()
                                                    .setProperty("name", Type.STRING, "sensor_{{i}}")
                                                    .addTo("sensors", "room")

                                    )
                    );


}
