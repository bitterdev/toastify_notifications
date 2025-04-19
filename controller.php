<?php

namespace Concrete\Package\ToastifyNotifications;

use Concrete\Core\Asset\AssetList;
use Concrete\Core\Package\Package;
use Concrete\Core\Page\Page;
use Concrete\Core\View\View;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class Controller extends Package
{
    protected string $pkgHandle = 'toastify_notifications';
    protected string $pkgVersion = '0.0.1';
    protected $appVersionRequired = '9.0.0';

    public function getPackageDescription(): string
    {
        return t('Replaces default form success and error messages with stylish Toastify notifications.');
    }

    public function getPackageName(): string
    {
        return t('Toastify Notifications');
    }

    public function on_start()
    {
        $al = AssetList::getInstance();
        $al->register("javascript", "toastify-notifications", "js/toastify-notifications.js", [], "toastify_notifications");
        $al->register("css", "toastify-notifications", "css/toastify-notifications.css", [], "toastify_notifications");
        $al->registerGroup("toastify-notifications", [
            ["javascript", "toastify-notifications"],
            ["css", "toastify-notifications"]
        ]);

        /** @var EventDispatcherInterface $eventDispatcher */
        /** @noinspection PhpUnhandledExceptionInspection */
        $eventDispatcher = $this->app->make(EventDispatcherInterface::class);

        $eventDispatcher->addListener("on_before_render", function () {
            $c = Page::getCurrentPage();

            if ($c instanceof Page && !$c->isError() && !$c->isSystemPage()) {
                $v = View::getInstance();
                $v->requireAsset("toastify-notifications");
            }
        });
    }
}