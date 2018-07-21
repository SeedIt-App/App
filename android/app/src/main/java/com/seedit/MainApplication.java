package com.seedit;

import android.app.Application;

import com.crashlytics.android.Crashlytics;
import com.facebook.react.ReactApplication;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.transistorsoft.rnbackgroundfetch.RNBackgroundFetchPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;
import com.rnfs.RNFSPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
/*// import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.modules.storage.ReactDatabaseSupplier;
import io.fabric.sdk.android.Fabric;*/
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  
 /* private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }*/

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactNativeOneSignalPackage(),
            new RNBackgroundFetchPackage(),
            new ReactVideoPackage(),
            new VectorIconsPackage(),
            new ImageResizerPackage(),
            new ImagePickerPackage(),
            new RNFSPackage(),
            new RNFetchBlobPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  /*public void openWebPage(String url) {

    Uri webpage = Uri.parse(url);

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        webpage = Uri.parse("http://" + url);
    }

    Intent intent = new Intent(Intent.ACTION_VIEW, webpage);
    if (intent.resolveActivity(getPackageManager()) != null) {
        startActivity(intent);
    }
  }*/


   @Override
  public void onCreate() {
    super.onCreate();
//    Fabric.with(this, new Crashlytics());
    SoLoader.init(getApplicationContext(), /* native exopackage */ false);
    //long size = 80L * 1024L * 1024L; // 50 MB
//    com.facebook.react.modules.storage.ReactDatabaseSupplier.getInstance(getApplicationContext()).setMaximumSize(size);
//    FacebookSdk.sdkInitialize(getApplicationContext());
    // If you want to use AppEventsLogger to log events.
    //AppEventsLogger.activateApp(this);
   // BackgroundTaskPackage.useContext(this);
  }
}
